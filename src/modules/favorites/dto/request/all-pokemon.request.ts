import { IsInt, IsNotEmpty, Min } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'

export class AllPokemonRequest {
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    description: 'Page number (must be >= 1)',
    example: 1,
  })
  page: number

  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    description: 'Limit per page (must be >= 1)',
    example: 10,
  })
  limit: number
}
