import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { InternalGrade } from '@dad-group-1/backend-common';
import { Enrollment } from '../../enrollments/entities/enrollment.entity';

@Entity()
export class Grade extends InternalGrade {
  @ManyToOne(() => Enrollment, (enrollment) => enrollment.grades)
  @JoinColumn({ name: 'enrollment_id' })
  enrollment: Enrollment;
}
