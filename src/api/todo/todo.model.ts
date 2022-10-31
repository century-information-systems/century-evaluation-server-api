import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';

export class TodoResource {
    @ApiProperty({
        title: 'Todo Unique ID',
        description: 'The unique ID of the todo...',
        example: 'ctx_7892rufwu9',
    })
    uid: string;
    @ApiProperty({
        title: 'Todo Title',
        description: 'The title of the todo...',
        example: 'First Todo',
    })
    title: string;

    @ApiProperty({
        title: 'Todo Description',
        description: 'The description of the todo...',
        example: 'This is my first todo!',
        nullable: true,
    })
    description: string | null;

    @ApiProperty({
        title: 'Todo Completion Status',
        description: 'The completion status of the todo...',
        example: true,
    })
    completed: boolean;

    @ApiProperty({
        title: 'Todo Created At Date',
        description: 'The date/time the todo was created...',
        example: '2020-10-31T14:00:44',
    })
    created_at: Date;

    @ApiProperty({
        title: 'Todo Created At Date',
        description: 'The date/time the todo was last updated...',
        example: '2020-10-31T15:00:55',
    })
    updated_at: Date;
}

export class CreateTodoDto {
    @ApiProperty({
        title: 'Todo Title',
        description: 'The title of the todo...',
        example: 'First Todo',
    })
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(100)
    title: string;

    @ApiProperty({
        title: 'Todo Description',
        description: 'The description of the todo...',
        example: 'This is my first todo!',
        required: false,
        nullable: true,
    })
    @IsOptional()
    @MinLength(20)
    @MaxLength(500)
    description: string;
}

export class UpdateTodoDto extends PartialType(CreateTodoDto) { }
