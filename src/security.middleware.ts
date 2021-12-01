import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import axios from 'axios';

@Injectable()
export class SecurityMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    // @ts-ignore
    const ip_addr = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    if (req.session.ip && req.session.ip !== ip_addr) {
      const r1 = await axios.get('http://ip-api.com/json/' + req.session.ip);
      const r2 = await axios.get('http://ip-api.com/json/' + ip_addr);
      if (r1.data.status !== 'fail' && r2.data.status !== 'fail' && r1.data.city !== r2.data.city) {
        req.session.user = null;
      }
    }
    if (req.session.user) {
      next();
      return;
    }
    res.redirect('google/redirect');
  }
}
