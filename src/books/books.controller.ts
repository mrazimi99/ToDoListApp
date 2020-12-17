import { Body, Controller, Delete, Get, Header, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { UserServices } from "../user/user.service";
import { BooksService } from "./books.service";
import { ApiBody, ApiCreatedResponse, ApiParam, ApiResponse } from "@nestjs/swagger";
import CreateUserDto from "../user/dto/create-user.dto";
import CreateBookDto from "./dto/create-book.dto";

@Controller('books')
export class BooksController {

    constructor(private readonly bookService: BooksService) { }

    @Header('Content-Type', 'application/json')
    @ApiCreatedResponse({ description: 'Will handle the creating of new Book' })
    @Post('post')
    @ApiBody({ type: CreateBookDto })
    postBook(@Body() book: CreateBookDto) {
        return this.bookService.insert(book).catch(err => {
            throw new HttpException({
                message: err.message
            }, HttpStatus.BAD_REQUEST);
        });
    }

    @ApiResponse({ status: 200, description: 'Returns the list of all the existing books' })
    @Get()
    getAll() {
        return this.bookService.getAllBooks();
    }
}