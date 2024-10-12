import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from '../infrastructure/user.repository';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';

@Module({
  imports: [InfrastructureModule.register("default")],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
