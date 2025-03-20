import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Analysis } from './analysis.entity';
import { Role } from '../enum/role.enum';
@Entity("users")
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'text' })
  firstName: string;

  @Column({ type: 'text' })
  lastName: string;

  @Column({ type: 'text' })
  username: string;

  @Column({ type: 'text' })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'enum', enum: ['reg', 'admin'] })
  role: Role;

  @OneToMany((type) => Analysis, (analysis) => analysis.user)
  analyses: Analysis[];
}
