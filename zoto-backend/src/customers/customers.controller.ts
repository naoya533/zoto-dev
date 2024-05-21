import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Customer } from '@prisma/client';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  async create(
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<Customer> {
    return this.customersService.createCustomer(createCustomerDto);
  }

  @Get()
  async findAll(): Promise<Customer[]> {
    return this.customersService.getAllCustomers();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Customer | null> {
    return this.customersService.getCustomerById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    return this.customersService.updateCustomer(id, updateCustomerDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<Customer> {
    return this.customersService.deleteCustomer(id);
  }
}
