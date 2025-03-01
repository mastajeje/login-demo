import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { Info, JwtPayload, User } from './types/Auth.types';



export const generateToken = (payload: JwtPayload) => {
  const secret = process.env.JWT_SECRET || 'dev_secret';
  const token = jwt.sign(payload, secret, {expiresIn: '1h'});
  return token;
};

// Passport Strategy

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    'jwt',
    {session: false},
    (err: Error, user: User, info: Info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({success: false, message: info.message});
      }
      req.user = user;
      next()
    }
  )(req, res, next);
};
