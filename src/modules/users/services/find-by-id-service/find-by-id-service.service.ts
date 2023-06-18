import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';

@Injectable()
export class FindByIdServiceService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async execute(id: number): Promise<User> {
    console.log(id);

    const user = await this.usersRepository.findOneBy({ id: id });
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return user;
  }
}
