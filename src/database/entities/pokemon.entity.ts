import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Favorite } from './favorite.entity'

@Entity({ name: 'pokemons' })
export class Pokemon extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

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
  legendary: boolean

  @Column({ type: 'text' })
  image: string

  @Column({ type: 'text' })
  ytbUrl: string

  @OneToMany(() => Favorite, favorite => favorite.pokemon)
  favorites: Favorite[]
}
