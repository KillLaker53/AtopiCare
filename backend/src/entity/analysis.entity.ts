import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Analysis {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'text' })
  status: string;

  @Column({ type: 'text' })
  tip: string;

  @ManyToOne(type => User, user => user.analyses)
  user: User;
}
