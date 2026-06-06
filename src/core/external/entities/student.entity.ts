import { Entity, OneToMany, OneToOne } from 'typeorm';
import { InternalStudent } from '@dad-group-1/backend-common';
import { User } from './user.entity';
import { Enrollment } from '../../enrollments/entities/enrollment.entity';

@Entity()
export class Student extends InternalStudent {
  @OneToOne(() => User, (user) => user.id)
  user: User;
  @OneToMany(() => Enrollment, (enrollment) => enrollment.student)
  enrollments: Enrollment[];
}
