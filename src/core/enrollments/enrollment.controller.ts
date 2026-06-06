import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreateEnrollmentRequestDto,
  PaginationQueryDto,
  UpdateEnrollmentDto,
} from '@dad-group-1/backend-common';
import { EnrollmentService } from './enrollment.service';

@Controller('enrollments')
export class EnrollmentController {
  private readonly logger = new Logger(EnrollmentController.name);
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @MessagePattern({ cmd: 'create_enrollment' })
  async create(@Payload() data: CreateEnrollmentRequestDto) {
    return this.enrollmentService.create(data);
  }

  @MessagePattern({ cmd: 'find_all_enrollments' })
  findAll(query: PaginationQueryDto) {
    return this.enrollmentService.findAll(query);
  }

  @MessagePattern({ cmd: 'find_one_enrollment' })
  findOne(@Payload() id: number) {
    return this.enrollmentService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_enrollment' })
  update(
    @Payload()
    payload: {
      id: number;
      updateData: UpdateEnrollmentDto;
    },
  ) {
    return this.enrollmentService.update(payload.id, payload.updateData);
  }

  @MessagePattern({ cmd: 'remove_enrollment' })
  remove(@Payload() id: number) {
    return this.enrollmentService.remove(id);
  }
}
