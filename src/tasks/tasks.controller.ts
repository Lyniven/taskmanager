import {TasksService} from './tasks.service';
import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {TaskModel, TaskStatus} from './task.model';
import {CreateTask} from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {
    }

    @Get()
    getAllTasks(): TaskModel[] {
        return this.tasksService.getAllTasks();
    }

    @Get(':id')
    getTaskById(@Param('id') id: string): TaskModel {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    async createTask(@Body() createTask: CreateTask): Promise<TaskModel> {
        return this.tasksService.createTask(createTask);
    }

    @Patch(':id/status')
    async updateTaskStatus(
        @Param('id') id: string,
        @Body('status') status: TaskStatus
    ): Promise<TaskModel> {
        return this.tasksService.updateTaskStatus(id, status);
    }

    @Delete(':id')
    deleteTask(@Param('id') id: string): void {
        this.tasksService.deleteTask(id);
    }
}
