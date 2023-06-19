import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../../dto/create-user-dto/create-user-dto';
import { User } from '../../entities/user.entity';

import * as bcrypt from 'bcrypt';
import { CreateBankAccountService } from 'src/modules/account/services/create-bank-account/create-bank-account.service';

@Injectable()
export class CreateUserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @Inject(CreateBankAccountService)
    private readonly createAccountService: CreateBankAccountService,
  ) {}

  async execute({ document, name, password }: CreateUserDto): Promise<User> {
    const userExists = await this.usersRepository.findOne({
      where: { document: document },
    });

    if (userExists) {
      throw new UnauthorizedException('User already registered');
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const user = this.usersRepository.create({
      name,
      document,
      password: hashedPass,
    });
    await this.usersRepository.save(user);
    await this.createAccountService.execute(user.id);

    return user;
  }
}
