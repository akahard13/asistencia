import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      jwt.verify(token, 'secretKey', (err, decoded) => {
        if (err) {
          return res.status(401).send('Invalid token');
        }
        req['user'] = decoded;
        next();
      });
    } else {
      res.status(401).send('No token provided');
    }
  }
}
