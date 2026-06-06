import { Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { InternalStudent } from '@dad-group-1/backend-common';
import { User } from './user.entity';
import { Enrollment } from '../../enrollments/entities/enrollment.entity';

@Entity()
export class Student extends InternalStudent {
  @OneToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;
  @OneToMany(() => Enrollment, (enrollment) => enrollment.student)
  enrollments: Enrollment[];
}
