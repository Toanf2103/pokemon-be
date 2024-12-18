import { Pokemon } from '@/database/entities';
import { ApiProperty } from '@nestjs/swagger';

export class PaginatedPokemonResponse {
  @ApiProperty({
    description: 'Danh sách các Pokemon',
    type: [Pokemon],
  })
  data: Pokemon[];

  @ApiProperty({
    description: 'Số trang hiện tại',
    example: 1,
  })
  page: number;

  @ApiProperty({
    description: 'Số lượng bản ghi mỗi trang',
    example: 10,
  })
  limit: number;

  @ApiProperty({
    description: 'Tổng số bản ghi trong cơ sở dữ liệu',
    example: 100,
  })
  total: number;
}
