import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Stories {
@PrimaryGeneratedColumn('uuid')
storyId: string;

@Column()
story: string;

@Column()
userId: string;

@Column()
default: boolean = false;

}