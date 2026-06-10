import { Module } from '@nestjs/common';
import { GradeController } from './grade.controller';
import { GradeService } from './grade.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enrollment } from '../enrollments/entities/enrollment.entity';
import { Grade } from './entities/grade.entity';
import { Student } from '../external/entities/student.entity';
import { User } from '../external/entities/user.entity';
import { Campus } from '../external/entities/campus.entity';
import { Role } from '../external/entities/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Grade, Enrollment, Student, User, Campus, Role]),
  ],
  controllers: [GradeController],
  providers: [GradeService],
})
export class GradeModule {}
