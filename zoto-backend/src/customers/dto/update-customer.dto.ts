import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from './create-customer.dto';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
  name?: string;
  nameKana?: string;
  address?: string;
  postalCode?: string;
  email?: string;
  phoneNumber?: string;
}
