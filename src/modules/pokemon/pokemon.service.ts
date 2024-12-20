import { Pokemon } from '@/database/entities'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { AllPokemonRequest, CreatePokemonRequest, ImportPokemonRequest } from './dto/request'
import { PaginatedPokemonResponse } from './dto/response/paginated-pokemon.response'
import { PokemonResponse } from './dto/response/pokemon.response'

@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(Pokemon) private readonly pokemonRepository: Repository<Pokemon>,
    private dataSource: DataSource,
  ) {}

  public async create(rq: CreatePokemonRequest): Promise<Pokemon> {
    const pokemon = this.pokemonRepository.create(rq)
    await this.pokemonRepository.save(pokemon)
    return pokemon
  }

  public async import(rq: ImportPokemonRequest[]): Promise<Boolean> {
    const BATCH_SIZE = 1000
    const cleanedRq = rq.map(({ id, legendary, ...rest }) => ({
      ...rest,
      legendary: legendary === 'true',
    }))
    await this.dataSource.transaction(async manager => {
      for (let i = 0; i < cleanedRq.length; i += BATCH_SIZE) {
        const batch = cleanedRq.slice(i, i + BATCH_SIZE)
        await manager.getRepository(Pokemon).insert(batch)
      }
    })
    return true
  }

  public async getAll(rq: AllPokemonRequest, userId: String): Promise<PaginatedPokemonResponse> {
    const { page = 1, limit = 10, type, legendary, minSpeed, maxSpeed, search } = rq

    const query = this.pokemonRepository.createQueryBuilder('pokemons')
    query.leftJoinAndSelect('pokemons.favorites', 'favorites', 'favorites.user_id = :userId', {
      userId,
    })

    if (search) {
      query.andWhere('pokemons.name LIKE :name', { name: `%${search}%` })
    }

    if (type) {
      query.andWhere('(pokemons.type1 = :type OR pokemons.type2 = :type)', { type })
    }

    if (legendary !== undefined) {
      query.andWhere('pokemons.legendary = :legendary', { legendary: legendary === 'true' ? 1 : 0 })
    }

    if (minSpeed && maxSpeed) {
      query.andWhere('pokemons.speed BETWEEN :minSpeed AND :maxSpeed', { minSpeed, maxSpeed })
    } else if (minSpeed) {
      query.andWhere('pokemons.speed >= :minSpeed', { minSpeed })
    } else if (maxSpeed) {
      query.andWhere('pokemons.speed <= :maxSpeed', { maxSpeed })
    }

    // Phân trang
    const offset = (page - 1) * limit
    query.skip(offset).take(limit)

    // Lấy danh sách và tổng số kết quả
    const [pokemons, total] = await query.getManyAndCount()
    const pokemonsWithFavorites = pokemons.map(pokemon => {
      const isFavorite = pokemon.favorites && pokemon.favorites.length > 0;
      return new PokemonResponse(pokemon, isFavorite);
    });
    return {
      data: pokemonsWithFavorites,
      page: Number(page),
      limit: Number(limit),
      total,
    }
  }

  public async trailer(): Promise<string[]> {
    const pokemons = await this.pokemonRepository
      .createQueryBuilder('pokemons')
      .select('pokemons.ytbUrl')
      .orderBy('RAND()')
      .limit(4)
      .getMany()

    return pokemons.map(pokemon => this.convertToEmbedUrl(pokemon.ytbUrl))
  }

  public async findOne(id: number): Promise<Pokemon | null> {
    const pokemon = await this.pokemonRepository.findOne({
      where: { id },
    })

    if (!pokemon) {
      throw new NotFoundException('Pokemon not found')
    }

    return null // Trả về null nếu không phải URL hợp lệ của YouTube
  }

  private convertToEmbedUrl(url: string): string | null {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/]+\/[^\s\/]+\/|(?:v|e(?:mbed)?)\/?([^"&?\/\s]{11})))|(?:youtu\.be\/([^"&?\/\s]{11}))/
    const match = url.match(regex)

    if (match) {
      // Trả về URL nhúng với ID video
      const videoId = match[1] || match[2]
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`
      }
    }

    return null // Trả về null nếu không phải URL hợp lệ của YouTube
  }
}
