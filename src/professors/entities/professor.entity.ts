import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Users } from '../../users/entities/user.entity';
@Entity({ name: 'professors' })
export class Professors extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 200, nullable: false })
    fullname: string;

    @Column({ length: 100, nullable: false })
    email: string;

    @Column({ length: 12, nullable: true })
    cellphone: string;

    @Column({ default: false })
    isAdmin: boolean;
    @OneToOne(() => Users, user => user.id_professor)
    users: Users;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}
