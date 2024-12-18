import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'pokemons' })
export class Pokemon extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  name: string

  @Column({ nullable: true })
  type1: string

  @Column({ nullable: true })
  type2: string

  @Column({ default: 0 })
  total: number

  @Column({ default: 0 })
  hp: number

  @Column({ default: 0 })
  attack: number

  @Column({ default: 0 })
  defence: number

  @Column({ default: 0 })
  spAttack: number

  @Column({ default: 0 })
  spDefence: number

  @Column({ default: 0 })
  speed: number

  @Column({ default: 0 })
  generation: number

  @Column({ default: false })
  lenhendary: boolean

  @Column({ type: 'text' })
  image: string

  @Column({ type: 'text' })
  ytbUrl: string
}
