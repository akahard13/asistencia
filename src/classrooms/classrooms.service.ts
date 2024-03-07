import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';
import { Classrooms } from './entities/classroom.entity';

@Injectable()
export class ClassroomsService {
  constructor(private readonly dataSource: DataSource) {}

  async create(createClassroomDto: CreateClassroomDto): Promise<Classrooms> {
    const { name } = createClassroomDto;
    const result = await this.dataSource.query(
      `INSERT INTO classrooms (name) VALUES (?)`,
      [name]
    );
    const id = result.insertId;
    const student = await this.dataSource.query(
      `SELECT * FROM classrooms WHERE id = ?`,
      [id]
    );
    return result;
  }

  async findAll(): Promise<Classrooms[]> {
    const classrooms = await this.dataSource.query(
      `SELECT * from classrooms`
    );
    return classrooms;
  }
  

  async findOne(id: number): Promise<Classrooms> {
    const classroom = await this.dataSource.query(
      `SELECT * FROM classrooms
      WHERE id = ?`,
      [id]
    );
    if (!classroom) {
      throw new NotFoundException('Student not found');
    }
    return classroom;
  }
  

  async update(id: number, updateClassroomDto: UpdateClassroomDto): Promise<Classrooms> {
    const { name } = updateClassroomDto;
    await this.dataSource.query(
      `UPDATE classrooms SET name = ? WHERE id = ?`,
      [name, id]
    );
    const updatedStudent = await this.findOne(id);
    return updatedStudent;
  }

  async remove(carnet: string): Promise<void> {
    const result = await this.dataSource.query(`DELETE FROM students WHERE carnet = ?`, [carnet]);
    if (result.affectedRows === 0) {
      throw new NotFoundException('Student not found');
    }
  }
}
