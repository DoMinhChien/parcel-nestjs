import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryColumn({ unique: true })
  id: string;


  @Column('varchar', { length: 500 })
  email: string;
  @Column('varchar', { name: 'display_name', length: 64 })
  displayName: string;
  @Column('varchar', {  length: 64 })
  password: string;
  @Column('varchar', {  length: 64 })
  address: string;
  @Column('varchar', {  length: 64 })
  phone: string;
  @Column('varchar', { })
  provincedCode: string;
  @Column('int', { default: 0 })
  gender: number;


}
