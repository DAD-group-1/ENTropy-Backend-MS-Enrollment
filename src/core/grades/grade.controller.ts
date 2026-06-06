import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreateGradeRequestDto,
  PaginationQueryDto,
  UpdateGradeDto,
} from '@dad-group-1/backend-common';
import { GradeService } from './grade.service';

@Controller('grades')
export class GradeController {
  private readonly logger = new Logger(GradeController.name);
  constructor(private readonly gradeService: GradeService) {}

  @MessagePattern({ cmd: 'create_grade' })
  async create(@Payload() data: CreateGradeRequestDto) {
    return this.gradeService.create(data);
  }

  @MessagePattern({ cmd: 'find_all_grades' })
  findAll(query: PaginationQueryDto) {
    return this.gradeService.findAll(query);
  }

  @MessagePattern({ cmd: 'find_one_grade' })
  findOne(@Payload() id: number) {
    return this.gradeService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_grade' })
  update(
    @Payload()
    payload: {
      id: number;
      updateData: UpdateGradeDto;
    },
  ) {
    return this.gradeService.update(payload.id, payload.updateData);
  }

  @MessagePattern({ cmd: 'remove_grade' })
  remove(@Payload() id: number) {
    return this.gradeService.remove(id);
  }
}
