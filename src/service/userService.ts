import * as express from 'express';
import IRequest from '../interface/IRequest';
import IResponse from '../interface/IResponse';
import * as _ from 'lodash';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import UserSchema from '../DBSchema/usersModel';
import usersModel from '../DBSchema/usersModel';
import CONFIG from '../config/config';
import IUser from '../interface/IUser';

export const validateUserData: express.RequestHandler = (req: IRequest, res: IResponse, next: express.NextFunction) => {
    if (_.isUndefined(req.error) === false)
        return next();

    const params = _.merge(req.body, req.param);

    if (_.isUndefined(params.name)) {
        req.error = "Please enter name"
        return next();
    }
    if (_.isUndefined(params.phone_no)) {
        req.error = "Please enter phone number";
        return next();
    }
    if (_.isUndefined(params.email)) {
        req.error = "Please enter email";
        return next();
    }
    if (_.isUndefined(params.password)) {
        req.error = "Please enter password";
        return next();
    }
    if (_.isUndefined(params.state)) {
        req.error = "Please provide state";
    }
    if (_.isUndefined(params.city)) {
        req.error = "Please provide city";
        return next();
    }
    if (_.isUndefined(params.pin_code)) {
        req.error = "Please provide pin code";
        return next();
    }
    return next();
}

export const emailVerify: express.RequestHandler = async (req: IRequest, res: IResponse, next: express.NextFunction) => {
    if (_.isUndefined(req.error) === false)
        return next();

    const params = _.merge(req.body, req.params);

    const emailRegexp: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const emailCheckFlag: boolean = emailRegexp.test(params.email);

    if (!emailCheckFlag) {
        req.error = "Please enter valid email id";
        return next();
    }
    //     
    //     
    // 
    // 
    // email existence code will come here
    // 
    // 
    // 
    // 
    try {
        const user = await usersModel.findOne({ email: params.email });
        if (_.isEmpty(user) === false) {
            req.error = "Email id is already taken, use other one";
            return next();
        }
    } catch (error) {
        console.log(error);
        req.error = "Server error!!"
        return next();
    }

    return next();
}

export const insertUser: express.RequestHandler = async (req: IRequest, res: IResponse, next: express.NextFunction) => {

    if (_.isUndefined(req.error) === false)
        return next();

    const params = _.merge(req.body, req.params);

    const userData = new UserSchema({
        name: params.name,
        phone_no: params.phone_no,
        email: params.email,
        password: bcrypt.hashSync(params.password, bcrypt.genSaltSync(8)),
        state: params.state,
        city: params.city,
        pin_code: params.pin
    });

    try {
        const user = await userData.save();
        req.data = user;
        return next();
    } catch (error) {
        console.log(error);
        req.error = "Server error";
        return next();
    }
}


export const userLoginValidateData: express.RequestHandler = async (req: IRequest, res: IResponse, next: express.NextFunction) => {
    console.log("Check point: 1");
    if (_.isUndefined(req.error) === false)
        return next();
    console.log("Check point: 2");

    const params = _.merge(req.body, req.param);
    console.log("Check point: 3");

    if (_.isUndefined(params.email)) {
        req.error = "Please enter email";
        return next();
    }
    console.log("Check point: 4");

    if (_.isUndefined(params.password)) {
        req.error = "Please enter password";
        return next();
    }
    console.log("Check point: 5");

    return next();
}

export const makeUserLogin: express.RequestHandler = async (req: IRequest, res: IResponse, next: express.NextFunction) => {
    console.log("Check point: 6");

    if (_.isUndefined(req.error) === false)
        return next();
    console.log("Check point: 7");

    const params = _.merge(req.body, req.param);
    try {
        console.log("Check point: 8");

        const user: IUser = await usersModel.findOne({ email: params.email });
        if (bcrypt.compareSync(params.password, user.password)) {
            req.token = jwt.sign(JSON.stringify(user), CONFIG.JWT_ENCRYPTION);
            req.data = user;
        }
        return next();
    } catch (error) {
        console.log("Check point: 11");

        console.log(error);
        req.error = "Server error!!"
        return next();
    }
}