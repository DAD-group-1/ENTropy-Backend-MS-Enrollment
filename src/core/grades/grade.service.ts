import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Grade } from './entities/grade.entity';
import { Repository } from 'typeorm';
import {
  CreateGradeRequestDto,
  GradeListResponseDto,
  GradeResponseDto,
  PaginationQueryDto,
  SearchPaginationQueryDto,
  UpdateGradeRequestDto,
} from '@dad-group-1/backend-common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class GradeService {
  private readonly logger = new Logger(GradeService.name);

  constructor(
    @InjectRepository(Grade)
    private gradeRepository: Repository<Grade>,
  ) {}

  async create(createData: CreateGradeRequestDto): Promise<GradeResponseDto> {
    const grade = this.gradeRepository.create({ ...createData });
    try {
      return await this.gradeRepository.save(grade);
    } catch (error) {
      this.logger.error(
        `${error.constructor.name}: Failed to create grade record - ${error.message}`,
        error.stack,
      );
      throw new RpcException({
        message: `Failed to create grade record`,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async findAll(query: PaginationQueryDto): Promise<GradeListResponseDto> {
    const { page, limit } = query;
    const skip = (page - 1) * limit;

    const [data, total] = await this.gradeRepository.findAndCount({
      relations: { enrollment: true },
      skip,
      take: limit,
      order: { id: 'DESC' },
    });

    return new GradeListResponseDto(data, total, page, limit);
  }

  async findOne(id: number): Promise<GradeResponseDto | null> {
    const grade = await this.gradeRepository.findOne({
      where: { id: id },
      relations: { enrollment: true },
    });

    if (!grade) {
      throw new RpcException({
        message: `Grade with ID ${id} not found`,
        code: HttpStatus.NOT_FOUND,
      });
    }

    return grade;
  }

  async findByStudentId(query: SearchPaginationQueryDto) {
    const { page, limit } = query.query;
    const skip = (page - 1) * limit;

    const [data, total] = await this.gradeRepository.findAndCount({
      where: { enrollment: { student_id: query.id } },
      relations: { enrollment: { course: true } },
      skip,
      take: limit,
      order: { id: 'DESC' },
    });

    return new GradeListResponseDto(data, total, page, limit);
  }

  async update(
    id: number,
    updateData: UpdateGradeRequestDto,
  ): Promise<GradeResponseDto | null> {
    const grade = await this.gradeRepository.findOne({
      where: { id: id },
    });
    if (!grade) {
      this.logger.error(`Grade with ID ${id} not found for update`);
      throw new RpcException({
        message: `Grade with ID ${id} not found`,
        code: HttpStatus.NOT_FOUND,
      });
    }

    this.gradeRepository.merge(grade, updateData);
    return await this.gradeRepository.save(grade);
  }

  async remove(id: number): Promise<GradeResponseDto | null> {
    const grade = await this.gradeRepository.findOne({
      where: { id: id },
    });
    if (!grade) {
      this.logger.error(`Grade with ID ${id} not found for deletion`);
      throw new RpcException({
        message: `Grade with ID ${id} not found`,
        code: HttpStatus.NOT_FOUND,
      });
    }

    await this.gradeRepository.remove(grade);
    return grade;
  }
}
