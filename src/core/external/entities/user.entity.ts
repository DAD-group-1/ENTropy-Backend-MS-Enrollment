import { Entity, ManyToOne } from 'typeorm';
import { InternalUser } from '@dad-group-1/backend-common';
import { Role } from './role.entity';
import { Campus } from './campus.entity';

@Entity()
export class User extends InternalUser {
  @ManyToOne(() => Role, (role) => role.users)
  role: Role;
  @ManyToOne(() => Campus, (campus) => campus.users)
  campus: Campus;
}
