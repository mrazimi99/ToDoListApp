import { Body, Controller, Delete, Get, Header, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import CreateCategoryDto from './dto/create-category.dto';
import CreateLabelDto from './dto/create-label.dto';
import CreateItemDto from './dto/create-item.dto';
import CreateTaskDto from './dto/create-task.dto';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) { }

    @Header('Content-Type', 'application/json')
    @ApiCreatedResponse({ description: 'Will handle the creating of new Label' })
    @Post('label')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiBody({ type: CreateLabelDto })
    postLabel(@Body() label: CreateLabelDto) {
        return this.todoService.insertLabel(label);
    }

    @Header('Content-Type', 'application/json')
    @ApiCreatedResponse({ description: 'Will handle the creating of new Category' })
    @Post('category')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiBody({ type: CreateCategoryDto })
    postCategory(@Body() category: CreateCategoryDto) {
        return this.todoService.insertCategory(category);
    }

    @Header('Content-Type', 'application/json')
    @ApiCreatedResponse({ description: 'Will handle the creating of new Item' })
    @Post('item')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiBody({ type: CreateItemDto })
    postItem(@Body() item: CreateItemDto) {
        return this.todoService.insertItem(item);
    }

    @Header('Content-Type', 'application/json')
    @ApiCreatedResponse({ description: 'Will handle the creating of new Task' })
    @Post('task')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiBody({ type: CreateTaskDto })
    postTask(@Body() task: CreateTaskDto) {
        return this.todoService.insertTask(task);
    }

    @ApiResponse({ status: 200, description: 'Returns the list of all the existing labels' })
    @Get('labels')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    getAllLabels() {
        return this.todoService.getAllLabels();
    }

    @ApiResponse({ status: 200, description: 'Returns the list of all the existing categories' })
    @Get('categories')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    getAllCategories() {
        return this.todoService.getAllCategories();
    }

    @ApiResponse({ status: 200, description: 'Returns the list of all the existing items of a specified task' })
    @Get('items')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    getItems(@Query('taskID', ParseIntPipe) taskID: number) {
        return this.todoService.getItemsOftask(taskID);
    }

    @ApiResponse({ status: 200, description: 'Returns the list of all the existing tasks' })
    @Get('tasks')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    getAllTasks() {
        return this.todoService.getAllTasks();
    }

    @ApiCreatedResponse({ description: 'Will handle deleting of an Item' })
    @Delete('item')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    deleteItem(@Query('taskID', ParseIntPipe) taskID: number, @Query('itemID', ParseIntPipe) itemID: number) {
        return this.todoService.deleteItemOfTask(taskID, itemID);
    }

    @ApiCreatedResponse({ description: 'Will handle deleting of a Task' })
    @Delete('task')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    deleteTask(@Query('taskID', ParseIntPipe) taskID: number) {
        return this.todoService.deleteTask(taskID);
    }

    @Header('Content-Type', 'application/json')
    @ApiCreatedResponse({ description: 'Will handle the updating of a Task' })
    @Put('task')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiBody({ type: CreateTaskDto })
    updateTask(@Query('taskID', ParseIntPipe) taskID: number, @Body() task: CreateTaskDto) {
        return this.todoService.updateTask(taskID, task);
    }
}
