import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  nameKana: string;
  @Column()
  address: string;
  @Column()
  postalCode: string;
  @Column()
  email: string;
  @Column()
  phone: string;
  @Column()
  companyCode: string;
}
