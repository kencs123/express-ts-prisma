import { PrismaClient, Product } from '@prisma/client';
import { CreateProductDto, UpdateProductDto } from '../dtos/ProductDto';

export class ProductRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async findById(id: number): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: { id }
    });
  }

  async create(productData: CreateProductDto): Promise<Product> {
    return this.prisma.product.create({
      data: productData
    });
  }

  async update(id: number, productData: UpdateProductDto): Promise<Product> {
    return this.prisma.product.update({
      where: { id },
      data: productData
    });
  }

  async delete(id: number): Promise<Product> {
    return this.prisma.product.delete({
      where: { id }
    });
  }
}