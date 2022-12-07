// Packages
import express, { Application, Request, Response, NextFunction } from 'express';
import mongoose, { Error } from 'mongoose';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import cookieParser from 'cookie-parser';

// Local files (connections)
import { config } from './config/config';
import User from './models/user';
const auth = require('./auth.ts');
// Connect styles ??? 
// app.use('/public', express.static(process.cwd() + '/public'));

// Connect to MongoDB Atlas
mongoose.connect(config.mongo.url, {
  retryWrites: true,
  w: 'majority'
}).then(() => {
  // Link serialize, deserialize, and the local strategy to the User model
  auth(app, User); 
  console.log('Connected to MongoDB.');
}).catch((error: Error) => {
  if (error) throw error;
  console.log(error);
});

// Allow the React front-end to access the Express back-end using CORS
const allowedOrigins = ['http://localhost:2002'];
const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
  credentials: true
};

// General middleware
const app: Application = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));

// Express session middleware
app.use(session({
  secret: config.passport.session_secret,
  resave: true, 
  saveUninitialized: true, 
  cookie: { secure: false }
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Render the index page
app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Backend');
});

app.post('/register', (req: Request, res: Response, next: NextFunction) => {
  // Store the username and password received in the POST request
  const usernameReceived = req.body.username;
  const passwordReceived = req.body.password;

  //console.log('Trying to register...');
  
  // Guard statement to make sure that a username and password are sent in the POST request
  if (!usernameReceived || !passwordReceived) {
    res.send("Improper values");
    return;
  }

  // Check if the user is already in the database
  User.findOne({ username: usernameReceived })
      .then((user) => {
        // If the user is found, redirect to the home page
        if (user) {
          res.send(`User already exists in the database.`);
          return;
        } 
        // If the user isn't already in the database, create a new user
        else {
          const hashedPassword = bcrypt.hashSync(passwordReceived, 12);

          // Create new user 
          const newUser = new User({
            username: usernameReceived,
            password: hashedPassword
          });

          newUser.save();
                /*
                 .then((doc) => { res.send(`User ${doc.username} saved`); })
                 .catch((error) => { res.send(`Error caught while creating new user: ${error}`); });*/      
          res.send("Success");
          return;
        }

      })
      .catch((error) => next(error));

}, passport.authenticate('local', { failureMessage: true }), (req: Request, res: Response, next: NextFunction) => {
  //res.redirect('/profile');
});

app.post('/login', passport.authenticate('local', { failureMessage: true}),  (req: Request, res: Response) => {
  //console.log("Trying to log in...");
  res.send('Successfully authenticated!');
  //return res.redirect('/~' + req.user.username);
  //res.redirect('/profile');
});

app.get('/logout', (req: Request, res: Response, next: NextFunction) => {
  //req.session.destroy((err) => console.log(err));
  req.logout((err) => {
    if (err) return next(err);
    else {
      res.send('Sucessfully logged out!');
      //res.redirect('/login');
      return;
    }
    //res.redirect('/');
  });
});

app.get('/user', (req: Request, res: Response) => {
  //console.log('Accessing user...');
  //console.log(req.user);
  res.send(req.user);
})

app.get('/users', (req: Request, res: Response) => {
  User.find({}).then((data: any) => {
    res.send(data);
  }).catch((error) => {
    console.log(error);
  })
});

// Start the server and start running any tests 
const listener = app.listen(config.server.port || 5002, () => function() {
  console.log('Your app is listening on ' + listener.address());
});