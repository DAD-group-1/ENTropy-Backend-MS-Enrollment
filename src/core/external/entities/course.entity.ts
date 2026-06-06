import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { InternalCourse } from '@dad-group-1/backend-common';
import { Program } from './program.entity';
import { Enrollment } from '../../enrollments/entities/enrollment.entity';

@Entity()
export class Course extends InternalCourse {
  @ManyToOne(() => Program, (program) => program.courses)
  program: Program;
  @OneToMany(() => Enrollment, (enrollment) => enrollment.course)
  enrollments: Enrollment[];
}
