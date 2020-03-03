import * as express from 'express';

export default interface IRequest extends express.Request {
    data: object;
    token: string;
    error: string;
}