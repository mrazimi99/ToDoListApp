import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import CategoryEntity from './category.entity';
import ItemEntity from './item.entity';
import LabelEntity from './label.entity';

@Entity()
export default class TaskEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500 })
    description: string;

    @ManyToOne(type => CategoryEntity, category => category.tasks)
    category: CategoryEntity;

    @ManyToMany(type => LabelEntity)
    @JoinTable()
    labels: LabelEntity[];

    @OneToMany(type => ItemEntity, item => item.task)
    items: ItemEntity[];
}