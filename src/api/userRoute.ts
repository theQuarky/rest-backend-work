import { Router, NextFunction } from 'express';
import * as _ from 'lodash';
import * as userController from '../controller/userController';
import * as userService from '../service/userService';

const user: Router = Router();



user.post('/register', [
    userService.validateUserData,
    userService.emailVerify,
    userService.insertUser,
    userController.sendUserData
]);

user.post('/login', [
    userService.userLoginValidateData,
    userService.makeUserLogin,
    userController.sendToken
]);

export default user;
