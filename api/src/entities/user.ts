import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  username: string = '';

  @Column()
  email: string = '';

  @Column()
  avatar: string = '';

  @Column()
  provider: string = '';

  @Column()
  token: string = '';
}
