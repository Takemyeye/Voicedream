import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserStory {
@PrimaryGeneratedColumn('uuid')
userStoryid: string;

@Column()
story: string;

@Column()
userId: string;

@Column()
voiceId: string;

}