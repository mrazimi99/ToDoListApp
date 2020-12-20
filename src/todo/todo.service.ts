import { Injectable } from '@nestjs/common';
import CategoryEntity from 'src/db/category.entity';
import ItemEntity from 'src/db/item.entity';
import LabelEntity from 'src/db/label.entity';
import TaskEntity from 'src/db/task.entity';
import CreateCategoryDto from './dto/create-category.dto';
import CreateItemDto from './dto/create-item.dto';
import CreateLabelDto from './dto/create-label.dto';
import CreateTaskDto from './dto/create-task.dto';

@Injectable()
export class TodoService {
    async insertLabel(labelDetails: CreateLabelDto): Promise<LabelEntity> {
        const labelEntity: LabelEntity = LabelEntity.create();
        const { name } = labelDetails;
        labelEntity.name = name;
        await LabelEntity.save(labelEntity);
        return labelEntity;
    }

    async insertCategory(categoryDetails: CreateCategoryDto): Promise<CategoryEntity> {
        const categoryEntity: CategoryEntity = CategoryEntity.create();
        const { name } = categoryDetails;
        categoryEntity.name = name;
        await CategoryEntity.save(categoryEntity);
        return categoryEntity;
    }

    async insertItem(itemDetails: CreateItemDto): Promise<ItemEntity> {
        const itemEntity: ItemEntity = ItemEntity.create();
        const { name, taskID } = itemDetails;
        itemEntity.name = name;
        itemEntity.task = await TaskEntity.findOne(taskID);
        await ItemEntity.save(itemEntity);
        return itemEntity;
    }

    async insertTask(taskDetails: CreateTaskDto): Promise<TaskEntity> {
        const taskEntity: TaskEntity = TaskEntity.create();
        const { description, categoryID, labelIDs, itemIDs } = taskDetails;
        taskEntity.description = description;
        taskEntity.category = await CategoryEntity.findOne(categoryID);
        taskEntity.labels = [];
        taskEntity.items = [];

        for (let i = 0; i < labelIDs.length; i++) {
            const label = await LabelEntity.findOne(labelIDs[i]);
            taskEntity.labels.push(label);
        }

        for (let i = 0; i < itemIDs.length; i++) {
            const item = await ItemEntity.findOne(itemIDs[i]);
            taskEntity.items.push(item);
        }

        await TaskEntity.save(taskEntity);
        return taskEntity;
    }

    async getAllLabels(): Promise<LabelEntity[]> {
        return await LabelEntity.find();
    }

    async getAllCategories(): Promise<CategoryEntity[]> {
        return await CategoryEntity.find();
    }

    async getItemsOftask(taskID: number): Promise<ItemEntity[]> {
        console.log(typeof (taskID));
        const task: TaskEntity = await TaskEntity.findOne({ where: { id: taskID }, relations: ['items'] });
        return task.items;
    }

    async getAllTasks(): Promise<TaskEntity[]> {
        return await TaskEntity.find();
    }

    async deleteItemOfTask(taskID: number, itemID: number): Promise<ItemEntity> {
        const item = await ItemEntity.findOne(itemID);
        await item.remove();
        return item;
    }

    async deleteTask(taskID: number): Promise<TaskEntity> {
        const task = await TaskEntity.findOne(taskID);
        await task.remove();
        return task;
    }

    async updateTask(taskID: number, taskDetails: CreateTaskDto): Promise<TaskEntity> {
        const { description, categoryID, labelIDs, itemIDs } = taskDetails;
        const old_task = await TaskEntity.findOne(taskID);
        old_task.description = description;
        old_task.category = await CategoryEntity.findOne(categoryID);
        old_task.labels = [];
        old_task.items = [];

        for (let i = 0; i < labelIDs.length; i++) {
            const label = await LabelEntity.findOne(labelIDs[i]);
            old_task.labels.push(label);
        }

        for (let i = 0; i < itemIDs.length; i++) {
            const item = await ItemEntity.findOne(itemIDs[i]);
            old_task.items.push(item);
        }

        await old_task.save();
        return old_task;
    }
}
