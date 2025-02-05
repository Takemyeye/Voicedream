import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
@PrimaryGeneratedColumn('uuid')
userId: string;

@Column()
username: string;

@Column()
email: string;

@Column()
avatar: string;

@Column()
credit: number;

@Column()
provider: string;

@Column()
token: string = 'хуй';

}
