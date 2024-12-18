import { ApiProperty } from "@nestjs/swagger";

// toggle-favorite.dto.ts
export class ToggleFavoriteResponse {
  @ApiProperty()
  pokemonId: string;

  @ApiProperty()
  isFavorited: boolean;

  @ApiProperty()
  message: string;
}