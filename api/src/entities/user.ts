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
avatar: string = "";

@Column()
credit: number = 50;

@Column()
provider: string;

@Column()
password?: string;
}
