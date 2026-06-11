import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreateGradeRequestDto,
  PaginationQueryDto,
  SearchPaginationQueryDto,
  UpdateGradeDto,
} from '@dad-group-1/backend-common';
import { GradeService } from './grade.service';

@Controller('grades')
export class GradeController {
  private readonly logger = new Logger(GradeController.name);
  constructor(private readonly gradeService: GradeService) {}

  @MessagePattern({ cmd: 'create_grade' })
  async create(@Payload() data: CreateGradeRequestDto) {
    this.logger.log('Received create grade request');
    return this.gradeService.create(data);
  }

  @MessagePattern({ cmd: 'find_all_grades' })
  findAll(query: PaginationQueryDto) {
    this.logger.log('Received find all grades request');
    return this.gradeService.findAll(query);
  }

  @MessagePattern({ cmd: 'find_one_grade' })
  findOne(@Payload() id: number) {
    this.logger.log('Received find one grade request for id: ' + id);
    return this.gradeService.findOne(id);
  }

  @MessagePattern({ cmd: 'find_grades_by_student' })
  findByStudentId(@Payload() query: SearchPaginationQueryDto) {
    return this.gradeService.findByStudentId(query);
  }

  @MessagePattern({ cmd: 'update_grade' })
  update(
    @Payload()
    payload: {
      id: number;
      updateData: UpdateGradeDto;
    },
  ) {
    this.logger.log('Received update grade request for id: ' + payload.id);
    return this.gradeService.update(payload.id, payload.updateData);
  }

  @MessagePattern({ cmd: 'remove_grade' })
  remove(@Payload() id: number) {
    this.logger.log('Received remove grade request for id: ' + id);
    return this.gradeService.remove(id);
  }
}
