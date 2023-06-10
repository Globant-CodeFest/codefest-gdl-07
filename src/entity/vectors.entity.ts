import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity()
export class Vectors extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    id_company: number;

    @Column()
    name: string;

    @Column()
    index: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}