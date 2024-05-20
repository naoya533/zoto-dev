import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Customer } from '@prisma/client';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  async createCustomer(
    @Body() customerData: CreateCustomerDto,
  ): Promise<Customer> {
    return this.customersService.createCustomer(customerData);
  }

  @Get()
  async getAllCustomers(): Promise<Customer[]> {
    return this.customersService.getAllCustomers();
  }

  @Get(':id')
  async getCustomerById(@Param('id') id: number): Promise<Customer | null> {
    return this.customersService.getCustomerById(id);
  }

  @Put(':id')
  async updateCustomer(
    @Param('id') id: number,
    @Body() customerData: UpdateCustomerDto,
  ): Promise<Customer> {
    return this.customersService.updateCustomer(id, customerData);
  }

  @Delete(':id')
  async deleteCustomer(@Param('id') id: number): Promise<Customer> {
    return this.customersService.deleteCustomer(id);
  }
}
