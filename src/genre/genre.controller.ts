import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import GenreServices from './genre.service';
import CreateGenreDto from './dto/create-genre.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('genre')
export default class GenreController {
    constructor(private readonly genreServices: GenreServices) { }
    @Post('post')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    postGenre(@Body() genre: CreateGenreDto) {
        return this.genreServices.insert(genre);
    }
    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    getAll() {
        return this.genreServices.getAllGenre();
    }
}