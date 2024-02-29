import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProfessorDto {
  @IsNotEmpty()
  fullname: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  cellphone?: string;

  @IsOptional()
  isAdmin?: boolean;
}
