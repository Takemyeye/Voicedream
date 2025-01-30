import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Voice {
@PrimaryGeneratedColumn()
voiceId: string;

@Column()
userId: string;

}