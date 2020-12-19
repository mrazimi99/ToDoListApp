import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import BookEntity from './book.entity';

@Entity()
export default class UserEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500 })
    name: string;

    @Column({ length: 500 })
    username: string;

    @Column({ length: 500 })
    password: string;

    // 1:n relation with bookEntity 
    @OneToMany(type => BookEntity, book => book.user)
    books: BookEntity[];
}