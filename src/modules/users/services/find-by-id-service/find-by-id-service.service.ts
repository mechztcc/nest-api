import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FindByIdServiceService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async execute(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id: id });
    return user;
  }
}
