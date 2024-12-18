import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  username: string

  @Column()
  password: string
}
