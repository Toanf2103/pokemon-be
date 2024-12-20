import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator'

export class ImportPokemonRequest {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
  })
  id: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
  })
  name: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
  })
  type1: string

  @IsString()
  @IsOptional()
  @ApiProperty({
    required: false,
  })
  type2: string

  @IsInt()
  @IsNotEmpty()
  @Min(0)
  @ApiProperty({
    required: true,
  })
  total: number

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @ApiProperty({
    required: true,
  })
  hp: number

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
  })
  attack: number

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
  })
  defence: number

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
  })
  spAttack: number

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
  })
  spDefence: number

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
  })
  speed: number

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
  })
  generation: number

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
  })
  legendary: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
  })
  image: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
  })
  ytbUrl: string
}
