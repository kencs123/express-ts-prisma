import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';
import { validateProduct } from '../middleware/ValidationMiddleware';

const router = Router();
const productController = new ProductController();

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', validateProduct, productController.createProduct);
router.put('/:id', validateProduct, productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

export default router;