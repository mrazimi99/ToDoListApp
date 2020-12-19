import BookEntity from '../db/book.entity';
import CreateBookDto from './dto/create-book.dto';
import UserEntity from '../db/user.entity';
import { createQueryBuilder, getConnection } from 'typeorm';
import GenreEntity from '../db/genre.entity';

export class BooksService {

    async insert(bookDetails: CreateBookDto): Promise<BookEntity> {
        const { name, userID, genreIDs } = bookDetails;
        const book = new BookEntity();
        book.name = name;
        book.user = await UserEntity.findOne(userID);
        book.genres = [];
        for (let i = 0; i < genreIDs.length; i++) {
            const genre = await GenreEntity.findOne(genreIDs[i]);
            book.genres.push(genre);
        }
        await book.save();
        return book;
    }
    async delete(bookID: number): Promise<BookEntity> {
        const book = await BookEntity.findOne(bookID);
        await book.remove();
        return book;
    }
    async update(bookID: number, bookDetails: CreateBookDto): Promise<BookEntity> {
        const { name, userID, genreIDs } = bookDetails;

        const old_book = await BookEntity.findOne(bookID);
        old_book.name = name;
        old_book.user = await UserEntity.findOne(userID);
        old_book.genres = [];
        for (let i = 0; i < genreIDs.length; i++) {
            const genre = await GenreEntity.findOne(genreIDs[i]);
            old_book.genres.push(genre);
        }
        await old_book.save();
        return old_book;
    }
    async getAllBooks(): Promise<BookEntity[]> {
        // const user: UserEntity = await UserEntity.findOne({where: {id: 2}, relations: ['books']});
        return BookEntity.find();
    }
}