import { Entity, OneToMany } from 'typeorm';
import { InternalProgramType } from '@dad-group-1/backend-common';
import { Program } from './program.entity';

@Entity()
export class ProgramType extends InternalProgramType {
  @OneToMany(() => Program, (program) => program.program_type_id)
  programs: Program[];
}
