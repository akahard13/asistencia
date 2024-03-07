import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, OneToOne, OneToMany } from 'typeorm';
import {Classes } from './../../classes/entities/class.entity';

@Entity({ name: 'classrooms'})
export class Classrooms extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: true })
  name: string;
  
}
