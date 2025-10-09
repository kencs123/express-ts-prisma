import { Request, Response, NextFunction } from 'express';
import { CreateProductDto, UpdateProductDto } from '../dtos/ProductDto';
import { ProductService } from '../services/ProductService';

export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  getAllProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const products = await this.productService.getAllProducts();
      res.status(200).json({ data: products, message: 'Products retrieved successfully' });
    } catch (error) {
      next(error);
    }
  };

  getProductById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const product = await this.productService.getProductById(id);
      res.status(200).json({ data: product, message: 'Product retrieved successfully' });
    } catch (error) {
      next(error);
    }
  };

  createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const productData: CreateProductDto = req.body;
      const product = await this.productService.createProduct(productData);
      res.status(201).json({ data: product, message: 'Product created successfully' });
    } catch (error) {
      next(error);
    }
  };

  updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const productData: UpdateProductDto = req.body;
      const product = await this.productService.updateProduct(id, productData);
      res.status(200).json({ data: product, message: 'Product updated successfully' });
    } catch (error) {
      next(error);
    }
  };

  deleteProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id);
      await this.productService.deleteProduct(id);
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      next(error);
    }
  };
}