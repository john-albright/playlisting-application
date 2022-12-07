import passport from 'passport';
import { Strategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import { ObjectId, Collection } from 'mongodb';
import { Application } from 'express';

//require('dotenv').config();

// Declaration merging for the type User (within the Express namespace)

declare global {
    namespace Express {
        interface User {
            username: string,
            isAdmin: boolean,
            _id?: string, // changed from number
            date_created: Date
        }
    }
}

module.exports = function(app: Application, myDataBase: Collection) {

    // Serialize the user's information
    passport.serializeUser((user: Express.User, done) => {
        done(null, user._id)
    })

    // Deserialize the user's information
    passport.deserializeUser((id: string, done) => {
        myDataBase.findOne({ _id: new ObjectId(id) })
                  .then((doc: any) => done(null, doc))
                  .catch((error: any) => console.log(error));
    });

    /* 
    passport.deserializeUser((id: string, done) => {
        myDataBase.findOne({ _id: new ObjectId(id) }, (err, doc) => {
          done(null, doc);
        });
    });*/

    // Set up a local strategy
    passport.use(new Strategy((username: string, password: string, done) => {
        myDataBase.findOne({ username: username }).then((user) => {
            //console.log('User ' + username + ' attempted to log in.');
            if (!user) return done(null, false, { message: 'Incorrect username and/or password!' });
            if (!bcrypt.compareSync(password, user.password)) return done(null, false, { message: 'Incorrect username and/or password!' });
            return done(null, user);
        }).catch((err) => done(err));
        }
    ));
}