import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user-dto/create-user-dto';
import { CreateUserService } from '../services/create-user/create-user.service';

@Controller('users')
export class UsersController {
  constructor(private createUserService: CreateUserService) {}
  @Post()
  async create(@Body() createUserDTO: CreateUserDto) {
    const users = await this.createUserService.execute(createUserDTO);
    return users;
  }
}
