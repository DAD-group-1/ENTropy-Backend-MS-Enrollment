import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Enrollment } from './entities/enrollment.entity';
import { Repository } from 'typeorm';
import {
  CreateEnrollmentRequestDto,
  EnrollmentListResponseDto,
  EnrollmentResponseDto,
  PaginationQueryDto,
  UpdateEnrollmentRequestDto,
} from '@dad-group-1/backend-common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class EnrollmentService {
  private readonly logger = new Logger(EnrollmentService.name);

  constructor(
    @InjectRepository(Enrollment)
    private enrollmentRepository: Repository<Enrollment>,
  ) {}

  async create(
    createData: CreateEnrollmentRequestDto,
  ): Promise<EnrollmentResponseDto> {
    const enrollment = this.enrollmentRepository.create({ ...createData });
    try {
      return await this.enrollmentRepository.save(enrollment);
    } catch (error) {
      this.logger.error(
        `${error.constructor.name}: Failed to create enrollment record - ${error.message}`,
        error.stack,
      );
      throw new RpcException({
        message: `Failed to create enrollment record`,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async findAll(query: PaginationQueryDto): Promise<EnrollmentListResponseDto> {
    const { page, limit } = query;
    const skip = (page - 1) * limit;

    const [data, total] = await this.enrollmentRepository.findAndCount({
      relations: { student: true },
      skip,
      take: limit,
      order: { id: 'DESC' },
    });

    return new EnrollmentListResponseDto(data, total, page, limit);
  }

  async findOne(id: number): Promise<EnrollmentResponseDto | null> {
    const enrollment = await this.enrollmentRepository.findOne({
      where: { id: id },
      relations: { student: true, course: true },
    });

    if (!enrollment) {
      throw new RpcException({
        message: `Enrollment with ID ${id} not found`,
        code: HttpStatus.NOT_FOUND,
      });
    }

    return enrollment;
  }

  async update(
    id: number,
    updateData: UpdateEnrollmentRequestDto,
  ): Promise<EnrollmentResponseDto | null> {
    const enrollment = await this.enrollmentRepository.findOne({
      where: { id: id },
    });
    if (!enrollment) {
      this.logger.error(`Enrollment with ID ${id} not found for update`);
      throw new RpcException({
        message: `Enrollment with ID ${id} not found`,
        code: HttpStatus.NOT_FOUND,
      });
    }

    this.enrollmentRepository.merge(enrollment, updateData);
    return await this.enrollmentRepository.save(enrollment);
  }

  async remove(id: number): Promise<EnrollmentResponseDto | null> {
    const enrollment = await this.enrollmentRepository.findOne({
      where: { id: id },
    });
    if (!enrollment) {
      this.logger.error(`Enrollment with ID ${id} not found for deletion`);
      throw new RpcException({
        message: `Enrollment with ID ${id} not found`,
        code: HttpStatus.NOT_FOUND,
      });
    }

    await this.enrollmentRepository.remove(enrollment);
    return enrollment;
  }
}
