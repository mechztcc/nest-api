import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';

@Injectable()
export class FindAllUsersServiceService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async execute(limit: number, page: number): Promise<any> {
    const offset = page * limit - limit;
    const [users, total] = await this.usersRepository
      .createQueryBuilder('users')
      .offset(offset)
      .take(limit)
      .getManyAndCount();

    const totalPages = total / limit;
    const next = total / limit > page ? page++ : 1;

    const pagination = {
      totalItems: total,
      totalPages: Number(totalPages.toFixed(0)),
      page: Number(page),
      nextPage: next,
      itemsPerPage: limit,
      data: users,
    };

    return pagination;
  }
}
