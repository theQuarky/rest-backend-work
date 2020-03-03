import * as express from 'express';
import * as _ from 'lodash';
import IRequest from '../interface/IRequest';
import IResponse from '../interface/IResponse';

export const sendProductrData = (req: IRequest, res: IResponse, next: express.NextFunction) => {
    return res.json({
        message: req.data,
        error: req.error
    });
}

export const sendProductImagePath = (req: IRequest, res: IResponse, next: express.NextFunction) =>{
    return res.json({
        message: req.data,
        error: req.error
    })
}