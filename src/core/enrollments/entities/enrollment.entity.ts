import { Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { InternalEnrollment } from '@dad-group-1/backend-common';
import { Course } from '../../external/entities/course.entity';
import { Student } from '../../external/entities/student.entity';
import { Grade } from '../../grades/entities/grade.entity';

@Entity()
export class Enrollment extends InternalEnrollment {
  @ManyToOne(() => Student, (student) => student.enrollments)
  @JoinColumn({ name: 'student_id' })
  student: Student;
  @ManyToOne(() => Course, (course) => course.enrollments)
  @JoinColumn({ name: 'course_id' })
  course: Course;
  @OneToMany(() => Grade, (grade) => grade.enrollment)
  grades: Grade[];
}
