import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../../dto/create-user-dto/create-user-dto';
import { User } from '../../entities/user.entity';

@Injectable()
export class CreateUserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async execute({ document, name, password }: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create({ name, document, password });
    this.usersRepository.save(user);

    return user;
  }
}
