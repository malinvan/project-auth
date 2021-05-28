import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

import netflixData from './data/netflix-titles.json';

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/authAPI';
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
// Added from Stack to remove deprication error. Don't know what it is.
// mongoose.set('useCreateIndex', true);
mongoose.Promise = Promise;

const User = mongoose.model('User', {
  email: {
    type: String,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex'),
  },
});

const Movie = mongoose.model('Movie', {
  title: String,
  director: String,
  release_year: Number,
  description: String,
});

if (process.env.RESET_DB) {
  const seedDB = async () => {
    await Movie.deleteMany();

    await netflixData.forEach((item) => {
      const newMovie = new Movie(item);
      newMovie.save();
    });
  };
  seedDB();
}

const authenicateUser = async (req, res, next) => {
  const accessToken = req.header('Authorization');
  try {
    const user = await User.findOne({ accessToken });
    if (user) {
      next();
    } else {
      res.status(401).json({ message: 'Not authenticated' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid request', error });
  }
};

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world');
});

app.post('/signup', async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync();
    const { email, password } = req.body;

    let user = await User.findOne({
      email,
    });
    if (user) {
      res.status(403).json({ errorCode: 'email-exists', message: 'A user with that email already exists' });
      return;
    }

    user = new User({
      email,
      password: bcrypt.hashSync(password, salt),
    });
    console.log(user);
    user.save();
    res.status(201).json({ id: user._id, accessToken: user.accessToken });
  } catch (error) {
    console.log(error);
    res.status(400).json({ errorCode: 'uknown-error', message: 'Could not create user', error });
  }
});

app.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ errorCode: 'invalid-credentials', message: 'Invalid credentials' });
      return;
    }

    if (!bcrypt.compareSync(password, user.password)) {
      res.status(401).json({ errorCode: 'invalid-credentials', message: 'Invalid credentials' });
      return;
    }

    res.json({
      id: user._id,
      email: user.email,
      accessToken: user.accessToken,
    });
  } catch (error) {
    res.status(400).json({ errorCode: 'uknown-error', message: 'Invalid request', error });
  }
});

// Just for development
app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Ändrade från netflixData.find() => Movie.find()
app.get('/netflix', authenicateUser, async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
