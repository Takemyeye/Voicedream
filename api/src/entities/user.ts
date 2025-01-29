import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number = 0;

  @Column()
  username: string = '';

  @Column()
  email: string = '';

  @Column()
  avatar: string = '';

  @Column()
  credit: number = 0;

  @Column()
  provider: string = '';

  @Column()
  token: string = '';

}
