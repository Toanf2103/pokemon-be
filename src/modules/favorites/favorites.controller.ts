import { Controller, HttpCode, HttpStatus, Param, Post, Req, UseGuards } from '@nestjs/common'
import { FavoritesService } from './favorites.service'
import { ApiOkResponse } from '@nestjs/swagger'
import { ToggleFavoriteResponse } from './dto/response/toggle-favorite.response'
import { Auth } from '@/common/decorators'

// favorites.controller.ts
@Controller('favorites')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Post(':pokemonId')
  @HttpCode(HttpStatus.OK)
  @Auth()
  @ApiOkResponse({ type: Boolean })
  async toggleFavorite(
    @Param('pokemonId') pokemonId: string,
    @Req() req,
  ): Promise<ToggleFavoriteResponse> {
    const userId = req.user.id

    return this.favoritesService.toggleFavorite(userId, pokemonId)
  }
}
