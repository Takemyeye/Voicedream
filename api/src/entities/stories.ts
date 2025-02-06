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
title: string;

@Column()
min: number;

@Column({nullable: true})
argument?: string;

@Column({nullable: true})
place?: string;

@Column()
default: boolean = false;

}