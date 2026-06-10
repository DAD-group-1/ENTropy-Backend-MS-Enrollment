import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { InternalStudent } from '@dad-group-1/backend-common';
import { User } from './user.entity';
import { Enrollment } from '../../enrollments/entities/enrollment.entity';
import { Program } from './program.entity';

@Entity()
export class Student extends InternalStudent {
  @OneToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;
  @OneToMany(() => Enrollment, (enrollment) => enrollment.student)
  enrollments: Enrollment[];
  @ManyToOne(() => Program, (program) => program.students)
  @JoinColumn({ name: 'program_id' })
  program: Program;
}
