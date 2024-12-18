// src/modules/favorites/favorites.module.ts
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FavoritesRepository } from './repositories/favorites.repository'
import { Favorite, Pokemon } from '@/database/entities'
import { FavoritesController } from './favorites.controller'
import { FavoritesService } from './favorites.service'

@Module({
  imports: [TypeOrmModule.forFeature([Favorite, Pokemon])],
  controllers: [FavoritesController],
  providers: [FavoritesService, FavoritesRepository],
  exports: [FavoritesService, FavoritesRepository],
})
export class FavoritesModule {}
