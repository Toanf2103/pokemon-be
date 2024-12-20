import { IsBooleanString, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
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

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 'fire',
  })
  search?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 'fire',
  })
  type?: string;

  @IsOptional()
  @IsBooleanString()
  @ApiPropertyOptional({
    example: 'true',
  })
  legendary?: string;

  @Transform(({ value }) => parseInt(value, 10))
  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiPropertyOptional({
    example: 50,
  })
  minSpeed?: number;

  @Transform(({ value }) => parseInt(value, 10))
  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiPropertyOptional({
    example: 150,
  })
  maxSpeed?: number;
}
