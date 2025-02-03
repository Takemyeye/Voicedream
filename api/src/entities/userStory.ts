import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class UserStory {
@PrimaryColumn()
id: string;

@Column()
userId: string;

@Column()
voiceId: string;

@Column()
storyId: string;

}