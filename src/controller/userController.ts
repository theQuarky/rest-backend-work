import * as express from 'express';
import * as _ from 'lodash';
import IRequest from '../interface/IRequest';
import IResponse from '../interface/IResponse';

export const sendUserData = (req: IRequest, res: IResponse, next: express.NextFunction) => {
    console.log(req.data);
    return res.json({
        message: req.data,
        error: req.error
    });
}

export const sendToken = (req: IRequest, res: IResponse, next: express.NextFunction) => {
    console.log("Token: "+req.token);
    return res.json({
        token: req.token,
        data: req.data,
        error: req.error
    });
}


// For test purpose only
export const test = (req: IRequest, res: IResponse, next: express.NextFunction) => {
    res.send({
        msg: "test"
    });
}