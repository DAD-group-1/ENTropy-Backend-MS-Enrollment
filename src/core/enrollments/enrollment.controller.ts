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
    this.logger.log('Received create enrollment request');
    return this.enrollmentService.create(data);
  }

  @MessagePattern({ cmd: 'find_all_enrollments' })
  findAll(query: PaginationQueryDto) {
    this.logger.log('Received find all enrollments request');
    return this.enrollmentService.findAll(query);
  }

  @MessagePattern({ cmd: 'find_one_enrollment' })
  findOne(@Payload() id: number) {
    this.logger.log('Received find one enrollment request for ID: ' + id);
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
    this.logger.log('Received update enrollment request for ID: ' + payload.id);
    return this.enrollmentService.update(payload.id, payload.updateData);
  }

  @MessagePattern({ cmd: 'remove_enrollment' })
  remove(@Payload() id: number) {
    this.logger.log('Received remove enrollment request for ID: ' + id);
    return this.enrollmentService.remove(id);
  }
}
