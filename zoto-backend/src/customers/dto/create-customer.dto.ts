export class CreateCustomerDto {
  name: string;
  nameKana: string;
  address: string;
  postalCode: string;
  email?: string;
  phone: string;
  companyCode: string;
}
