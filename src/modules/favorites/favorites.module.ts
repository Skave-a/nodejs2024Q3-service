import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TrackService } from 'src/modules/track/track.service';
import { AlbumService } from 'src/modules/album/album.service';
import { ArtistService } from 'src/modules/artist/artist.service';

@Module({
  providers: [FavoritesService, TrackService, AlbumService, ArtistService],
  controllers: [FavoritesController],
})
export class FavoritesModule {}
