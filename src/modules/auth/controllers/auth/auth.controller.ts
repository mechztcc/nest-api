import { Body, Controller, Post } from '@nestjs/common';
import { CreateSessionDto } from '../../dto/create-session/create-session-dto';
import { CreateSessionService } from '../../services/create-session/create-session.service';

@Controller('auth')
export class AuthController {
  constructor(private createSession: CreateSessionService) {}
  @Post()
  async create(@Body() createSession: CreateSessionDto) {
    const session = await this.createSession.execute(createSession);
    return session;
  }
}
