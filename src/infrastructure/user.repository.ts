import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AceBase } from 'acebase';
import { User } from '../user/entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(@Inject("ACEBASE_DB") private readonly acebase: AceBase) {}

  async add(users: User[]) {
    const userRef = this.acebase.ref(`/user`);
    const updates = users.reduce((acc, user) => {
      acc[user.id] = user;
      return acc;
    }, {});

    await userRef.set(updates);
  }

  async getOne(userId: string): Promise<User> {
    const snapshot = await this.acebase.ref<User>(`/user/${userId}`).get();
    const user = snapshot.val();
    if (!user) throw new NotFoundException();
    return user;
  }

  async getBunch(userIds: string[]): Promise<User[]> {
    const snapshot = await this.acebase.ref<User[]>('/user').query().filter('id', 'in', userIds).get();
    return snapshot.getValues();
  }
}