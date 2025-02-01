import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Voice {
@PrimaryGeneratedColumn()
id: string;

@Column()
voiceName: string = 'Antonio';

@Column()
userId: string;

}