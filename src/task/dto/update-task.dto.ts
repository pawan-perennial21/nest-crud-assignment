import { IsOptional,MinLength,MaxLength, IsString, IsBoolean } from 'class-validator';
export class UpdateTaskDto {
  @IsOptional()
  @IsString({ message: 'Title must be a string' })
  @MinLength(3, { message: 'Title should be at least 3 characters long' })
  @MaxLength(100, { message: 'Title cannot be longer than 100 characters' })
  title: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  @MaxLength(500, { message: 'Description cannot be longer than 500 characters' })
  description: string;

  @IsOptional()
  @IsBoolean({ message: 'Completed must be a boolean value' })
  completed: boolean;
}
