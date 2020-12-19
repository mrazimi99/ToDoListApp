import { Body, Controller, Delete, Get, Header, HttpException, HttpStatus, Param, Post, Put, ParseIntPipe, Query } from '@nestjs/common';
import { UserServices } from "../user/user.service";
import { BooksService } from "./books.service";
import { ApiBody, ApiCreatedResponse, ApiParam, ApiResponse, } from "@nestjs/swagger";
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

    @ApiCreatedResponse({ description: 'Will handle deleting of a Book' })
    @Delete()
    deleteBook(@Query('bookID', ParseIntPipe) bookID: number) {
        return this.bookService.delete(bookID).catch(err => {
            throw new HttpException({
                message: err.message
            }, HttpStatus.BAD_REQUEST);
        });
    }

    @Header('Content-Type', 'application/json')
    @ApiCreatedResponse({ description: 'Will handle the creating of new Book' })
    @Put('update')
    @ApiBody({ type: CreateBookDto })
    updateBook(@Body() book: CreateBookDto, @Query('bookID', ParseIntPipe) bookID: number) {
        return this.bookService.update(bookID, book).catch(err => {
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