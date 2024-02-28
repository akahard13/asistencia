import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcryptjs';
@Entity({ name: 'users' })
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ unique: true})
    cod: string;
    @Column({ nullable: false})
    fullname: string;
    @Column({ nullable: false, unique: true})
    email: string;
    @Column()
    password: string;
    @Column()
    cellphone: string;
    @Column()
    grade: number;
    @Column({ default: false })
    isProfessor: boolean;
    @Column({ default: false })
    isAdmin: boolean;
    @Column()
    @CreateDateColumn()
    created_at: Date;

    @BeforeInsert()
    async hashPassword() {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, 8);
        }
    }
    async validatePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }
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