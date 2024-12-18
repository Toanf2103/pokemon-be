import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Pokemon } from './pokemon.entity'
import { User } from './user.entity'

@Entity('favorites')
export class Favorite extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User

  @ManyToOne(() => Pokemon)
  @JoinColumn({ name: 'pokemon_id' })
  pokemon: Pokemon
}
