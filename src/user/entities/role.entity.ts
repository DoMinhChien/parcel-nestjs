import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('role')
export class RoleEntity {
  @PrimaryColumn({ unique: true })
  id: string;

  @Column('varchar', { length: 100 })
  role: string;

  @ManyToMany(() => UserEntity, (user : UserEntity) => user.roles)

  public users : UserEntity[];
}
