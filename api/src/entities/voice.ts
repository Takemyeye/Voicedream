import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Voice {
@PrimaryColumn()
voiceId: string;

@Column()
voiceName: string = '';

@Column()
userId: string;

@Column()
default: boolean = false;
}
