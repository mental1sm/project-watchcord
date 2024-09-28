import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
  ) {}

  save(users: User[]): Promise<User[]> {
    return this.repository.save(users);
  }

  findOne(userId: string) {
    return this.repository.findOne({ where: { id: userId } });
  }
}
