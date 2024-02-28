import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
  id: number;
  cod: string;
  password: string;
  grade: number;
  isProfessor: boolean;
  isAdmin: boolean;
  @IsEmail()
  email: string;

  @IsNotEmpty()
  fullname: string;
  cellphone: string;
}

/*
      id int auto_increment primary key,
  cod VARCHAR(30) unique,
  fullname VARCHAR(200) NOT NULL,
  email VARCHAR(100) NOT NULL,
  cellphone VARCHAR(12),
  grade INT(10),
    isProfessor boolean default false,
  isAdmin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP*/