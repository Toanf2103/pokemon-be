import { Pokemon } from '@/database/entities'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { AllPokemonRequest, CreatePokemonRequest, ImportPokemonRequest } from './dto/request'
import { PaginatedPokemonResponse } from './dto/response/paginated-pokemon.response'

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
    const cleanedRq = rq.map(({ id, ...rest }) => rest)

    // Sử dụng transaction
    await this.dataSource.transaction(async manager => {
      for (let i = 0; i < cleanedRq.length; i += BATCH_SIZE) {
        const batch = cleanedRq.slice(i, i + BATCH_SIZE) // Chia nhỏ batch
        // Chèn batch bằng transaction manager
        await manager.getRepository(Pokemon).insert(batch)
      }
    })
    return true
  }

  public async getAll(rq: AllPokemonRequest): Promise<PaginatedPokemonResponse> {
    const { page = 1, limit = 10 } = rq

    const query = this.pokemonRepository.createQueryBuilder('pokemon')

    // Phân trang
    const offset = (page - 1) * limit
    query.skip(offset).take(limit)

    const [pokemons, total] = await query.getManyAndCount()

    return {
      data: pokemons,
      page,
      limit,
      total,
    }
  }

  public async findOne(id: string): Promise<Pokemon | null> {
    const pokemon = await this.pokemonRepository.findOne({
      where: { id },
    })

    if (!pokemon) {
      throw new NotFoundException('Pokemon not found')
    }

    return pokemon
  }
}
