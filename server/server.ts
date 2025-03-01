import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import passport from 'passport';
import { authenticateJWT } from './auth';
import {ExtractJwt, Strategy as JwtStrategy} from 'passport-jwt';
import { User } from './user';

// import {Strategy as LocalStorage} from 'passport-local';
// import {User} from '../server/user';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const passportOption = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || 'dev_secret'
} 

passport.use(
    new JwtStrategy(passportOption , async (jwt_payload, done) => {
      try {
        const {username} = jwt_payload;
        const user = User[username];
        if (user === undefined) {
          return done(null, false, {message: 'Invalid username'});
        }

        return done(null, {username});
      } catch (error) {
        done(error);
      }
    })
  );


app.get('/',authenticateJWT, (req, res) => {
    res.status(200).json({message: 'Hello World!'});
}
);


require('./routes/auth')(app);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
