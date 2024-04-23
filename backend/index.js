import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/bookRoute.js';
import cors from 'cors';

const app = express();

// Middleware for parsing request body
app.use(express.json());

app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('Welcome to MERN Stack Tutorial');
});

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());
// Option 2: All Custom Origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );

app.use('/books', booksRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App listening on port: ${PORT}`);
    });
    console.log('App connected to database');
  })
  .catch((error) => {
    console.log(error);
  });
