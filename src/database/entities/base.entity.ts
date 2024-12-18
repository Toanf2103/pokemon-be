import { Column, DeleteDateColumn } from 'typeorm'

export class BaseEntity {
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updatedAt: string

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: string
}
