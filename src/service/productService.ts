import express = require("express");
import IRequest from "../interface/IRequest";
import IResponse from "../interface/IResponse";
import * as _ from "lodash";
import ProductModel from "../DBSchema/prodectModel";
import IProduct from "../interface/IProduct";
import * as multer from 'multer';
import * as fs from 'fs';
import * as mime from 'mime-types';

export const addProduct: express.RequestHandler = async (req: IRequest, res: IResponse, next: express.NextFunction) => {

    if (_.isUndefined(req.error) === false)
        return next();

    const params = _.merge(req.body, req.params);
    const file = params.prodImg;
    const extTemp = file.split(';base64,')[0];
    var fileExt:string = '';

    for(let i=11; i<extTemp.length;i++){
        fileExt += extTemp[i];
    }
    const path = '/uploads/'+Date.now()+'.'+fileExt;

    try {
        fs.writeFileSync('./src'+path, params.prodImg.split(';base64,').pop(),{encoding: 'base64'});
    } catch (error) {
            console.log(error);
            return next();
    }

    const product = new ProductModel({
        name: params.name,
        type: params.type,
        sub_type: params.sub_type,
        price: params.price,
        img_path: path,
        available: true
    });

    try {
        console.log('in try catch block');
        const productResponce = await product.save();
        console.log(productResponce);
        req.data = productResponce;
        return next();
    } catch (error) {
        console.log(error);
        req.error = "Server error!!";
        return next();
    }
}

export const getAllProducts: express.RequestHandler = async (req: IRequest, res: IResponse, next: express.NextFunction) => {

    if (_.isUndefined(req.error) === false)
        return next();

    const productObj = new ProductModel();

    try {
        const products:IProduct[] = await ProductModel.find();
        console.log(products);
        req.data = products;
        return next();
    } catch (error) {
        console.log(error);
        req.error = "Server error!!";
        return next();
    }
}

export const validateProduct: express.RequestHandler = (req: IRequest, res: IResponse, next: express.NextFunction) => {
    if (_.isUndefined(req.error) === false)
        return next();

    const params = _.merge(req.body, req.params);

    console.log(params);

    if (_.isUndefined(params.name)) {
        req.error = "Plaese enter name of product";
        return next();
    }

    if (_.isUndefined(params.type)) {
        req.error = "Plaese enter type of product";
        return next();
    }
    if (_.isUndefined(params.sub_type)) {
        req.error = "Plaese enter sub type of product";
        return next();
    }

    if (_.isUndefined(params.price)) {
        req.error = "Plaese enter price of product";
        return next();
    }

    if (_.isUndefined(params.prodImg)) {
        req.error = "Plaese upload product image";
        return next();
    }

    return next();
}


export const getProductById: express.RequestHandler = async (req: IRequest, res: IResponse, next: express.NextFunction) => {
    const id = req.params.id;
    try{
        const product = await ProductModel.find({_id: id});
        res.json({
            product: product
        });
    }catch(error){
        res.json({
          error
        });
    }
}


export const getAllProductsBySubType: express.RequestHandler = async (req: IRequest, res: IResponse, next: express.NextFunction) => {

    if (_.isUndefined(req.error) === false)
        return next();

    const productObj = new ProductModel();

    console.log(req.params.type, req.params.subType);

    try {
        const products:IProduct[] = await ProductModel.find({type:req.params.type, sub_type: req.params.subType});
        console.log(products);
        req.data = products;
        return next();
    } catch (error) {
        console.log(error);
        req.error = "Server error!!";
        return next();
    }
}
export const getAllProductsByType: express.RequestHandler = async (req: IRequest, res: IResponse, next: express.NextFunction) => {

    if (_.isUndefined(req.error) === false)
        return next();

    const productObj = new ProductModel();

    try {
        const products:IProduct[] = await ProductModel.find({type:req.params.type});
        console.log(products);
        req.data = products;
        return next();
    } catch (error) {
        console.log(error);
        req.error = "Server error!!";
        return next();
    }
}
