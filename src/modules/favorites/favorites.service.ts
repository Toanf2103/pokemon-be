import { Injectable, NotFoundException } from '@nestjs/common'
import { FavoritesRepository } from './repositories/favorites.repository'
import { InjectRepository } from '@nestjs/typeorm'
import { Pokemon } from '@/database/entities'
import { Repository } from 'typeorm'
import { ToggleFavoriteResponse } from './dto/response/toggle-favorite.response'

// favorites.service.ts
@Injectable()
export class FavoritesService {
  constructor(
    private favoritesRepository: FavoritesRepository,
    @InjectRepository(Pokemon) private readonly pokemonRepository: Repository<Pokemon>,
  ) {}

  async toggleFavorite(userId: string, pokemonId: string): Promise<ToggleFavoriteResponse> {
    // Kiểm tra Pokemon có tồn tại không
    const pokemon = await this.pokemonRepository.findOne({
      where: { id: pokemonId },
    })

    if (!pokemon) {
      throw new NotFoundException('Pokemon not found')
    }

    const isFavorited = await this.favoritesRepository.toggleFavorite(userId, pokemonId)

    return {
      pokemonId,
      isFavorited,
      message: isFavorited ? 'Pokemon added to favorites' : 'Pokemon removed from favorites',
    }
  }
}
