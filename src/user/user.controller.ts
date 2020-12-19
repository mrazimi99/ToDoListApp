import { Body, Controller, Get, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { UserServices } from './user.service';
import CreateUserDto from './dto/create-user.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UserController {
    constructor(private readonly usersServices: UserServices) { }

    //'postUser()' will handle the creating of new User
    @Post('post')
    postUser(@Body() user: CreateUserDto) {
        return this.usersServices.insert(user);
    }
    // 'getAll()' returns the list of all the existing users in the database
    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    getAll() {
        return this.usersServices.getAllUsers();
    }

    //'getBooks()' return all the books which are associated with the user 
    // provided through 'userID' by the request  
    @Get('books')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    getBooks(@Body('userID', ParseIntPipe) userID: number) {
        return this.usersServices.getBooksOfUser(userID);
    }
}