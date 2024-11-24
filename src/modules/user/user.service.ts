import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/modules/user/dto/update-user.dto';
import { User } from 'src/common/types';

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  findAll(): User[] {
    return this.users;
  }

  findOne(id: string): User {
    if (!this.isValidUUID(id)) {
      throw new BadRequestException('Invalid user ID format');
    }

    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  findByLogin(login: string): User | undefined {
    return this.users.find((user) => user.login === login);
  }

  create(userDto: CreateUserDto): User {
    const user: User = {
      id: uuidv4(),
      login: userDto.login,
      password: userDto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.push(user);

    return { ...user, password: undefined };
  }

  update(id: string, updateUserDto: UpdateUserDto): User {
    const user = this.findOne(id);
    Object.assign(user, updateUserDto);
    user.version += 1;
    user.updatedAt = Date.now();

    return { ...user, password: undefined };
  }

  remove(id: string): void {
    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1) {
      throw new NotFoundException('User not found');
    }

    this.users.splice(index, 1);
  }

  private isValidUUID(id: string): boolean {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
  }
}
