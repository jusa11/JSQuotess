require('dotenv').config();
const authRouter = require('./routes/authRoutes.js');
const quotesRouter = require('./routes/quotesRoute.js');
const usersRouter = require('./routes/usersRoute.js');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/auth', authRouter);
app.use('/quotes', quotesRouter);
app.use('/user', usersRouter);
app.use('/uploads', express.static('uploads'));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error', err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
