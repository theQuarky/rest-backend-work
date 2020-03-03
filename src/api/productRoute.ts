import { Router } from 'express';
import authentication from '../helpers/verifyToken';
import * as productService from "../service/productService";
import * as productController from "../controller/productController";
import upload from '../helpers/fileUpload';

const product: Router = Router();


// get all products
product.get('/', [
    productService.getAllProducts,
    productController.sendProductrData
]);

// get specific type product
product.get('/:type', [
    productService.getAllProductsByType,
    productController.sendProductrData
]);

// get specific type and sub type product
product.get('/:type/:subType', [
    productService.getAllProductsBySubType,
    productController.sendProductrData
]);

// get product by id
product.get('/id/:id', [
    productService.getProductById
]);

// get product by name
product.get('/search', [

]);

// add new product
product.post('/', authentication, [
    productService.validateProduct,
    productService.addProduct,
    productController.sendProductrData
]);

// update product
product.put('/:id', [

]);

// delete product
product.delete('/:id', [

]);

export default product