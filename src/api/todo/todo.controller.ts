import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiBody, ApiNoContentResponse, ApiResponse } from "@nestjs/swagger";
import { CreateTodoDto, TodoResource, UpdateTodoDto } from "./todo.model";
import { TodoService } from "./todo.service";

@Controller('/todos')
export class TodoController {
    constructor(private readonly todoService: TodoService) { }

    @ApiResponse({
        type: [TodoResource],
    })
    @Get('/list')
    list() {
        return this.todoService.list();
    }

    @ApiResponse({
        type: TodoResource,
    })
    @Get('/find/uid/:uid')
    findByUid(@Param('uid') uid: string) {
        return this.todoService.findByUid(uid);
    }

    @ApiResponse({
        type: TodoResource,
    })
    @ApiBody({
        type: CreateTodoDto,
    })
    @Post('/create')
    create(@Body() payload: CreateTodoDto) {
        return this.todoService.create(payload);
    }

    @ApiResponse({
        type: TodoResource,
    })
    @ApiBody({
        type: UpdateTodoDto,
    })
    @Patch('/update/:uid')
    update(@Param('uid') uid: string, @Body() payload: UpdateTodoDto) {
        return this.todoService.update(uid, payload);
    }

    @ApiNoContentResponse()
    @Delete('/delete/:uid')
    delete(@Param('uid') uid: string) {
        return this.todoService.delete(uid);
    }

    @ApiResponse({
        type: TodoResource,
    })
    @Get('/toggle-completion-status/:uid')
    toggleCompletionStatus(@Param('uid') uid: string) {
        return this.todoService.toggleCompletionStatus(uid);
    }
}