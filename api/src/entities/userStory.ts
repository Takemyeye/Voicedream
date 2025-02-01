import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserStory {
@PrimaryGeneratedColumn()
id: string;

@Column()
userId: string;

@Column()
voiceId: string;

}