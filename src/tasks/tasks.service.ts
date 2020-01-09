import {TaskModel, TaskStatus} from './task.model';
import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid/v1';
import {CreateTask} from './dto/create-task.dto';


@Injectable()
export class TasksService {
    private tasks: TaskModel[] = [];

    getAllTasks(): TaskModel[] {
        return this.tasks;
    }

    getTaskById(id: string): TaskModel {
        return this.tasks.find(task => task.id === id);
    }

    async createTask(createTask: CreateTask): Promise<TaskModel> {
        const { title, description } = createTask;

        const task: TaskModel = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN,
        };
        this.tasks.push(task);
        return task;
    }

    updateTaskStatus(id: string, status: TaskStatus) {
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }

    deleteTask(id: string): void {
        this.tasks = this.tasks.filter(task => task.id !== id);
    }
}
