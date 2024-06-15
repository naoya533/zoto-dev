import { Injectable } from '@nestjs/common';
import { Customer, Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async getCustomersByCompanyCode(user: User): Promise<Customer[]> {
    return this.prisma.customer.findMany({
      where: {
        companyCode: user.companyCode,
      },
    });
  }

  async createCustomer(userId: string, companyCode: string, data: CreateCustomerDto): Promise<Customer> {
    return this.prisma.customer.create({
      data: {
        ...data,
        user: { connect: { id: userId } },
        companyCode: companyCode,
      },
    });
  }

  async getAllCustomers(): Promise<Customer[]> {
    return this.prisma.customer.findMany();
  }

  async getCustomerByemail(email: string): Promise<Customer | null> {
    return this.prisma.customer.findUnique({where:{email:email}});
  }

  async updateCustomer(
    email: string,
    companyCode:string,
    data: Prisma.CustomerUpdateInput,
  ): Promise<Customer> {
    return this.prisma.customer.update({
      where: { 
        email:email,
        companyCode:companyCode,
      },
      data,
    });
  }

  async deleteCustomer(email: string,companyCode:string): Promise<Customer> {
    return this.prisma.customer.delete({where:{email:email,companyCode:companyCode}});
  }
}
