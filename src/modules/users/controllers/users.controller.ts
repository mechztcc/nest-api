import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user-dto/create-user-dto';
import { CreateUserService } from '../services/create-user/create-user.service';
import { FindAllUsersServiceService } from '../services/find-all-users-service/find-all-users-service.service';
import { FindByIdServiceService } from '../services/find-by-id-service/find-by-id-service.service';

@Controller('users')
export class UsersController {
  constructor(
    private createUserService: CreateUserService,
    private findAllUsersService: FindAllUsersServiceService,
    private findUserByIdService: FindByIdServiceService,
  ) {}
  @Post()
  async create(@Body() createUserDTO: CreateUserDto) {
    const users = await this.createUserService.execute(createUserDTO);
    return users;
  }

  @Get()
  async index(@Query() query: any) {
    const { page = 1, limit = 10 } = query;
    const users = await this.findAllUsersService.execute(limit, page);
    return users;
  }

  @Get(':id')
  async findById(@Param() params: any) {
    const { id } = params;

    const users = await this.findUserByIdService.execute(id);
    return users;
  }
}
