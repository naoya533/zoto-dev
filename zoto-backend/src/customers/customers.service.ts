import { Injectable } from '@nestjs/common';
import { Customer, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async createCustomer(data: Prisma.CustomerCreateInput): Promise<Customer> {
    return this.prisma.customer.create({ data });
  }

  async getAllCustomers(): Promise<Customer[]> {
    return this.prisma.customer.findMany();
  }

  async getCustomerById(id: number): Promise<Customer | null> {
    return this.prisma.customer.findUnique({ where: { id } });
  }

  async updateCustomer(
    id: number,
    data: Prisma.CustomerUpdateInput,
  ): Promise<Customer> {
    return this.prisma.customer.update({
      where: { id },
      data,
    });
  }

  async deleteCustomer(id: number): Promise<Customer> {
    return this.prisma.customer.delete({ where: { id } });
  }
}
