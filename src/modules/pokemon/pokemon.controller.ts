import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseFilePipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { ApiBody, ApiConsumes, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { PokemonService } from './pokemon.service'
import { AllPokemonRequest, CreatePokemonRequest, ImportPokemonRequest } from './dto/request'
import { Pokemon } from '@/database/entities'
import { Auth } from '@/common/decorators'
import { FileInterceptor } from '@nestjs/platform-express'
import { parse } from 'csv-parse/sync'
import { PaginatedPokemonResponse } from './dto/response/paginated-pokemon.response'

@Controller('pokemons')
@ApiTags('Pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post('/')
  @HttpCode(HttpStatus.OK)
  @Auth()
  @ApiOkResponse({ type: Pokemon })
  public async create(@Body() createPokemonRequest: CreatePokemonRequest): Promise<Pokemon> {
    const result = await this.pokemonService.create(createPokemonRequest)
    return result
  }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: [Pokemon] })
  public async getAll(@Query() rq: AllPokemonRequest): Promise<PaginatedPokemonResponse> {
    const result = await this.pokemonService.getAll(rq)
    return result
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: Pokemon })
  @ApiNotFoundResponse({ description: 'Pokemon not found' })
  public async getDetail(@Param('id') id: string): Promise<Pokemon> {
    const pokemon = await this.pokemonService.findOne(id);

    if (!pokemon) {
      throw new NotFoundException('Pokemon not found');
    }

    return pokemon;
  }

  @Post('import')
  @HttpCode(HttpStatus.OK)
  @Auth()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  public async importPokemonsFromCsv(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'text/csv' })],
      }),
    )
    file: Express.Multer.File,
  ): Promise<Boolean> {
    const csvData = this.removeBOM(file.buffer.toString('utf-8'))

    // Parse CSV data
    const records = parse(csvData, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    }) as ImportPokemonRequest[]

    const result = await this.pokemonService.import(records)
    return result
  }

  private removeBOM(str: string): string {
    return str.replace(/^\uFEFF/, '')
  }
}
