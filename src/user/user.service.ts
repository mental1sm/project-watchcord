import { Inject, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserRepository } from '../infrastructure/user.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject() private readonly repository: UserRepository,
  ) {}

  async save(users: User[]): Promise<User[]> {
    await this.repository.add(users);
    return Promise.all([]);
  }

  findOne(userId: string) {
    return Promise.any([]);
  }

  findAll() {
    return this.repository.getAll();
  }
}
