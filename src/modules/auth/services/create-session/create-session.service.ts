import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { User } from 'src/modules/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateSessionDto } from '../../dto/create-session/create-session-dto';
import auth from '../../../../configs/auth';
import { BankAccount } from 'src/modules/account/entities/bank-account.entity';

@Injectable()
export class CreateSessionService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(BankAccount)
    private accountRepository: Repository<BankAccount>,
  ) {}

  async execute(data: CreateSessionDto): Promise<any> {
    const userExists = await this.usersRepository.findOne({
      where: { document: data.document },
    });

    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    const passwordConfirmed = await compare(data.password, userExists.password);
    if (!passwordConfirmed) {
      throw new UnauthorizedException(
        'Password or document proved has invalid',
      );
    }

    const account = await this.accountRepository.findOne({
      where: { user: { id: userExists.id } },
    });

    const token = sign({}, auth.jwt.secret, {
      subject: String(userExists.id),
      expiresIn: auth.jwt.expiresIn,
    });

    return {
      token: token,
      name: userExists.name,
      balance: account.balance,
      accountCode: account.code,
      userId: userExists.id,
    };
  }
}
