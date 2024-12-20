// src/modules/favorites/repositories/favorites.repository.ts
import { Favorite } from '@/database/entities'
import { Injectable, NotFoundException } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'

@Injectable()
export class FavoritesRepository extends Repository<Favorite> {
  constructor(private dataSource: DataSource) {
    super(Favorite, dataSource.createEntityManager())
  }

  async toggleFavorite(userId: string, pokemonId: number): Promise<boolean> {
    const existingFavorite = await this.findOne({
      where: {
        user: { id: userId },
        pokemon: { id: pokemonId },
      },
    })

    if (existingFavorite) {
      await this.remove(existingFavorite)
      return false
    } else {
      // Chưa có -> Thêm vào favorite
      const newFavorite = this.create({
        user: { id: userId },
        pokemon: { id: pokemonId },
      })
      await this.save(newFavorite)
      return true
    }
  }

  async findUserFavorites(
    userId: string,
    options?: { page?: number; limit?: number },
  ): Promise<Favorite[]> {
    const { page = 1, limit = 20 } = options || {}

    const favorites = await this.find({
      where: {
        user: { id: userId },
      },
      relations: ['pokemon'],
      skip: (page - 1) * limit,
      take: limit,
    })

    if (!favorites || favorites.length === 0) {
      throw new NotFoundException('No favorites found for this user')
    }

    return favorites
  }
}
