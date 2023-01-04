import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import 'colors';
const uri = 'mongodb://mongodb_c:27017';
const app = express();
dotenv.config();
mongoose.set('strictQuery', false);
const connectDB = async () => {
  let isConnected = false;
  try {
    //const conn = await mongoose.connect(process.env.MONGO_URI);
    const conn = await mongoose.connect(uri);
    //const conn = await mongoose.connect(process.env.LOCAL_DB_TEST);
    console.log(
      `MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold
    );
    isConnected = true;
  } catch (error) {
    console.log(`😱 Error: ${error}`.red.underline.bold);
    isConnected = false;
  } finally {
    await mongoose.connection.close();
    return isConnected;
  }
};

app.get('/users', (req, res) => {
  const users = [
    { id: 1, username: 'atana' },
    { id: 2, username: 'john' },
    { id: 3, username: 'ben' },
  ];
  res.json(users);
});

app.get('/test', async (req, res, next) => {
  const result = await connectDB();
  res.json(`MongoDB ${result ? ' connected' : ' not connected'}`);
  next();
});

app.listen(5010, console.log('Server running on port 5010...'));
