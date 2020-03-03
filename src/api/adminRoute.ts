import { Router, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as _ from 'lodash';
import IRequest from '../interface/IRequest';
import IResponse from '../interface/IResponse';
import authentication from '../helpers/verifyToken';
import CONFIG from '../config/config';
const admin: Router = Router();





admin.post('/login', (req, res, next) => {
    const params = _.merge(req.body, req.params);

    if (params.email === 'ranahiren27@gmail.com' && params.password === 'hiren@27') {
        jwt.sign({ email: params.email, password: params.password }, CONFIG.JWT_ENCRYPTION, (err: any, token: any) => {
            console.log(token);
            res.json({
                token:token
            });
        });
    } else {
        res.json({
            message: "Enter valid email and password"
        });
    }
});

admin.get('/test', authentication, (req: IRequest, res: IResponse, next: NextFunction) => {
    jwt.verify(req.token, CONFIG.JWT_ENCRYPTION, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                authData
            });
        }
    });
});

export default admin;
