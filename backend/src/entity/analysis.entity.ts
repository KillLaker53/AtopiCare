import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity("analysis")
export class Analysis {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'text' })
  classification: string;

  @Column({ type: 'text' })
  tip: string;

  @CreateDateColumn()
  createdAt: Date; 

  @Column({ type: 'text' })
  imageUrl: string; 

  @ManyToOne((type) => User, (user) => user.analyses)
  user: User;
} 