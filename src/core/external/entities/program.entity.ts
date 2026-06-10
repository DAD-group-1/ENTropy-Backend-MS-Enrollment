import { Entity, OneToMany } from 'typeorm';
import { InternalProgram } from '@dad-group-1/backend-common';
import { Course } from './course.entity';
import { ProgramType } from './program-type.entity';
import { Student } from './student.entity';

@Entity()
export class Program extends InternalProgram {
  @OneToMany(() => Course, (course) => course.program)
  courses: Course[];
  @OneToMany(() => ProgramType, (programType) => programType.programs)
  programTypes: ProgramType[];
  @OneToMany(() => Student, (student) => student.program)
  students: Student[];
}
