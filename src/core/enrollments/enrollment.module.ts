import { Module } from '@nestjs/common';
import { EnrollmentController } from './enrollment.controller';
import { EnrollmentService } from './enrollment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enrollment } from './entities/enrollment.entity';
import { Grade } from '../grades/entities/grade.entity';
import { Course } from '../external/entities/course.entity';
import { Student } from '../external/entities/student.entity';
import { Program } from '../external/entities/program.entity';
import { ProgramType } from '../external/entities/program-type.entity';
import { User } from '../external/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Enrollment,
      Grade,
      Course,
      Student,
      User,
      Program,
      ProgramType,
    ]),
  ],
  controllers: [EnrollmentController],
  providers: [EnrollmentService],
})
export class EnrollmentModule {}
