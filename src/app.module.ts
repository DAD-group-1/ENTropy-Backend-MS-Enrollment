import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { EnrollmentModule } from './core/enrollments/enrollment.module';
import { GradeModule } from './core/grades/grade.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    DatabaseModule,
    EnrollmentModule,
    GradeModule,
  ],
})
export class AppModule {}
