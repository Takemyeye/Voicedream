import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Stories {
@PrimaryGeneratedColumn()
storyId: number = 0;

@Column()
story: string = '';

@Column()
userId: number = 0;

}