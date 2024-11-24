import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  HttpCode,
  HttpStatus,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesResponse } from './favorites.response';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getFavorites(): Promise<FavoritesResponse> {
    try {
      return this.favoritesService.getFavorites();
    } catch (error) {
      throw new NotFoundException('Favorites not found');
    }
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  async addTrackToFavorites(@Param('id') id: string): Promise<void> {
    try {
      return this.favoritesService.addTrackToFavorites(id);
    } catch (error) {
      throw new UnprocessableEntityException(
        'Invalid track ID format or invalid data',
      );
    }
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  async addAlbumToFavorites(@Param('id') id: string): Promise<void> {
    try {
      return this.favoritesService.addAlbumToFavorites(id);
    } catch (error) {
      throw new UnprocessableEntityException(
        'Invalid album ID format or invalid data',
      );
    }
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  async addArtistToFavorites(@Param('id') id: string): Promise<void> {
    try {
      return this.favoritesService.addArtistToFavorites(id);
    } catch (error) {
      throw new UnprocessableEntityException(
        'Invalid artist ID format or invalid data',
      );
    }
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeTrackFromFavorites(@Param('id') id: string): Promise<void> {
    try {
      return this.favoritesService.removeTrackFromFavorites(id);
    } catch (error) {
      throw new NotFoundException('Track not found in favorites');
    }
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAlbumFromFavorites(@Param('id') id: string): Promise<void> {
    try {
      return this.favoritesService.removeAlbumFromFavorites(id);
    } catch (error) {
      throw new NotFoundException('Album not found in favorites');
    }
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeArtistFromFavorites(@Param('id') id: string): Promise<void> {
    try {
      return this.favoritesService.removeArtistFromFavorites(id);
    } catch (error) {
      throw new NotFoundException('Artist not found in favorites');
    }
  }
}
