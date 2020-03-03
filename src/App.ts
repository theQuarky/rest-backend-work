import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as multer from "multer";
import apiV1 from './api/index';
import * as errorHandler from './helpers/errorHandler';
import * as mongoose from "mongoose";
import * as Debug from "debug";
import CONFIG  from './config/config';
import IRequest from './interface/IRequest';
import IResponse from './interface/IResponse';
import * as _ from 'lodash';
class App {
  public express: express.Application;

  uri: string = CONFIG.DB_HOST;
  
  constructor() {
    const debug = Debug("DATABASE");
    this.express = express();
    this.setMiddleware();
    this.setRoutes();
    this.catchErrors();
    mongoose.connect(this.uri, (err: any) => {
      if (err) {
        console.log(err.message);
      } else {
        console.log("Successfully Connected!");
      }
    });
  }

  private setMiddleware(): void {
    this.express.use(cors());
    this.express.use(morgan('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(express.static(__dirname+'/uploads'));
    this.express.use(cors());
    // this.express.use(multer({dest:'tmp/'}).any);
    this.express.use(helmet());
    this.express.use((req:IRequest, res:IResponse, next: express.NextFunction)=>{
      const params = _.merge(req.body, req.params);
      // console.log(params);
      return next();
    });
  }

  private setRoutes(): void {
    this.express.use('/v1', apiV1);
  }

  private catchErrors(): void {
    this.express.use(errorHandler.notFound);
    this.express.use(errorHandler.internalServerError);
  }
}

export default new App().express;
