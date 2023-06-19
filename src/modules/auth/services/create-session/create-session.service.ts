import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { User } from 'src/modules/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateSessionDto } from '../../dto/create-session/create-session-dto';
import auth from '../../../../configs/auth';

@Injectable()
export class CreateSessionService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
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

    const token = sign({}, auth.jwt.secret, {
      subject: String(userExists.id),
      expiresIn: auth.jwt.expiresIn,
    });

    return { token };
  }
}
