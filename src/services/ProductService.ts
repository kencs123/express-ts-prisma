import { Product } from '@prisma/client';
import { CreateProductDto, UpdateProductDto } from '../dtos/ProductDto';
import { HttpException } from '../exceptions/HttpException';
import { ProductRepository } from '../repositories/ProductRepository';

export class ProductService {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.findAll();
  }

  async getProductById(id: number): Promise<Product> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new HttpException(404, `Product with id ${id} not found`);
    }
    return product;
  }

  async createProduct(productData: CreateProductDto): Promise<Product> {
    return this.productRepository.create(productData);
  }

  async updateProduct(id: number, productData: UpdateProductDto): Promise<Product> {
    // Check if product exists
    await this.getProductById(id);
    return this.productRepository.update(id, productData);
  }

  async deleteProduct(id: number): Promise<Product> {
    // Check if product exists
    await this.getProductById(id);
    return this.productRepository.delete(id);
  }
}