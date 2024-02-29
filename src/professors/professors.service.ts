// professors.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { Professors } from './entities/professor.entity';

@Injectable()
export class ProfessorsService {
  constructor(private readonly dataSource: DataSource) {}

  async create(createProfessorDto: CreateProfessorDto): Promise<Professors> {
    const { fullname, email, cellphone, isAdmin } = createProfessorDto;
    const result = await this.dataSource.query(
      `INSERT INTO professors (fullname, email, cellphone, isAdmin, created_at) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)`,
      [fullname, email, cellphone, isAdmin]
    );
    const id = result.insertId;
    const response = await this.dataSource.query(
      `SELECT * FROM professors WHERE id = ?`,
      [id]
    );
    return response;
  }

  async findAll(): Promise<Professors[]> {
    const response = await this.dataSource.query(
      `SELECT * FROM professors`
    );
    return response;
  }

  async findOne(id: number): Promise<Professors> {
    const professor = await this.dataSource.query(
      `SELECT * FROM professors WHERE id = ?`,
      [id]
    );
    if (!professor) {
      throw new NotFoundException(`Professor with id ${id} not found`);
    }
    return professor;
  }

  async update(id: number, updateProfessorDto: UpdateProfessorDto): Promise<Professors> {
    const { fullname, email, cellphone, isAdmin } = updateProfessorDto;
    await this.dataSource.query(
      `UPDATE professors SET fullname = ?, email = ?, cellphone = ?, isAdmin = ? WHERE id = ?`,
      [fullname, email, cellphone, isAdmin, id]
    );
    const professor = await this.findOne(id);
    return professor;
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id); // Ensure professor exists
    await this.dataSource.query(
      `DELETE FROM professors WHERE id = ?`,
      [id]
    );
  }
}
