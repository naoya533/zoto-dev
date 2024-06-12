import { Module } from '@nestjs/common';
import { CustomersModule } from './customers/customers.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [CustomersModule, UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
