import { Router } from 'express';
import user from './userRoute';
import admin from './adminRoute';
import product from './productRoute'
const router: Router = Router();

router.use('/users', user);
router.use('/admin',admin);
router.use('/products',product)
// You can add more endpoints here


export default router;