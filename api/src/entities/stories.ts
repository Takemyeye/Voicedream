import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Stories {
@PrimaryGeneratedColumn('uuid')
storyId: string;

@Column()
story: string = 'default';

@Column()
userId: string = 'default';

@Column()
default: boolean = false;

}