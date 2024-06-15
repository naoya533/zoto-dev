import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
  Request
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Customer } from '@prisma/client';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Request() req, @Body() createCustomerDto: CreateCustomerDto
  ): Promise<Customer> {
    //console.log('Request User:', req.user); // デバッグ用ログ

    const userId = req.user?.userId;
    const companyCode = req.user?.companyCode;

    if (!userId || !companyCode) {
      console.error('User ID or Company Code is missing'); // エラーログ
      throw new Error('User ID or Company Code is missing');
    }
    return this.customersService.createCustomer(userId, companyCode, createCustomerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getCustomers(@Request() req) : Promise<Customer[]>{
    return this.customersService.getCustomersByCompanyCode(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':email')
  async findOne(@Param('email') email: string): Promise<Customer | null> {
    return this.customersService.getCustomerByemail(email);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':email')
  async update(
    @Param('email') email: string,
    @Param('companyCode') companyCode: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    return this.customersService.updateCustomer(email, companyCode,updateCustomerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':email')
  async remove(
    @Param('email') email: string,
    @Param('companyCode') companyCode: string
  ): Promise<Customer> {
    return this.customersService.deleteCustomer(email,companyCode);
  }
}
