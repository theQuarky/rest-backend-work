import IRequest from '../interface/IRequest';
import IResponse from '../interface/IResponse';
import { NextFunction } from 'express';

export default function authentication(req:IRequest, res:IResponse, next:NextFunction) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
      // Split at the space
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      req.token = bearerToken;
      // Next middleware
      next();
  } else {
      // Forbidden
      res.sendStatus(403);
  }
}

