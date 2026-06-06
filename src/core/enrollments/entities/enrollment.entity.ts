import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { InternalEnrollment } from '@dad-group-1/backend-common';
import { Course } from '../../external/entities/course.entity';
import { Student } from '../../external/entities/student.entity';
import { Grade } from '../../grades/entities/grade.entity';

@Entity()
export class Enrollment extends InternalEnrollment {
  @ManyToOne(() => Student, (student) => student.enrollments)
  student: Student;
  @ManyToOne(() => Course, (course) => course.enrollments)
  course: Course;
  @OneToMany(() => Grade, (grade) => grade.enrollment)
  grades: Grade[];
}
