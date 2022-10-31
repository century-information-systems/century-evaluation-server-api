import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTodoDto, TodoResource, UpdateTodoDto } from './todo.model';

@Injectable()
export class TodoService {
    constructor(private readonly prisma: PrismaService) { }

    async list(): Promise<TodoResource[]> {
        const todos = await this.prisma.todo.findMany({
            orderBy: { created_at: 'asc' },
        });

        return todos;
    }

    async findByUid(uid: string): Promise<TodoResource> {
        const todo = await this.prisma.todo.findUnique({
            where: { uid: uid },
        });
        if (!todo) {
            throw new NotFoundException(
                `A todo with the specified ID: ${uid} was not found!`,
            );
        }

        return todo;
    }

    async create(payload: CreateTodoDto): Promise<TodoResource> {
        const todo = await this.prisma.todo.create({
            data: {
                title: payload.title,
                description: payload.description,
                completed: false,
            },
        });

        return todo;
    }

    async update(uid: string, payload: UpdateTodoDto): Promise<TodoResource> {
        const existingTodo = await this.prisma.todo.findUnique({
            where: { uid: uid },
        });
        if (!existingTodo) {
            throw new NotFoundException(
                `A todo with the specified ID: ${uid} was not found!`,
            );
        }

        const updatedTodo = await this.prisma.todo.update({
            where: { uid: uid },
            data: {
                title: payload.title ?? existingTodo.title,
                description: payload.description ?? existingTodo.description,
            },
        });

        return updatedTodo;
    }

    async delete(uid: string): Promise<void> {
        const existingTodo = await this.prisma.todo.findUnique({
            where: { uid: uid },
        });
        if (!existingTodo) {
            throw new NotFoundException(
                `A todo with the specified ID: ${uid} was not found!`,
            );
        }

        await this.prisma.todo.delete({
            where: { uid: uid },
        });
    }

    async toggleCompletionStatus(uid: string): Promise<TodoResource> {
        const existingTodo = await this.prisma.todo.findUnique({
            where: { uid: uid },
        });
        if (!existingTodo) {
            throw new NotFoundException(
                `A todo with the specified ID: ${uid} was not found!`,
            );
        }

        const updatedTodo = await this.prisma.todo.update({
            where: { uid: uid },
            data: {
                completed: !existingTodo.completed,
            },
        });

        return updatedTodo;
    }
}
