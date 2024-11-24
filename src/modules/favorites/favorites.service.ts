import {
  Injectable,
  UnprocessableEntityException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Favorites } from './favorites.entity';
import { FavoritesResponse } from './favorites.response';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';
import { validate as uuidValidate } from 'uuid';

@Injectable()
export class FavoritesService {
  private favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  constructor(
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

  getFavorites(): FavoritesResponse {
    const response: FavoritesResponse = {
      artists: this.favorites.artists
        .map((id) => this.artistService.findOne(id))
        .filter((artist) => artist !== null),
      albums: this.favorites.albums
        .map((id) => this.albumService.findOne(id))
        .filter((album) => album !== null),
      tracks: this.favorites.tracks
        .map((id) => this.trackService.findOne(id))
        .filter((track) => track !== null),
    };

    return response;
  }

  addTrackToFavorites(id: string): void {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Invalid track ID');
    }

    const track = this.trackService.findOne(id);
    if (!track) {
      throw new UnprocessableEntityException('Track not found');
    }

    if (!this.favorites.tracks.includes(id)) {
      this.favorites.tracks.push(id);
    }
  }

  addAlbumToFavorites(id: string): void {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Invalid album ID');
    }

    const album = this.albumService.findOne(id);
    if (!album) {
      throw new UnprocessableEntityException('Album not found');
    }

    if (!this.favorites.albums.includes(id)) {
      this.favorites.albums.push(id);
    }
  }

  addArtistToFavorites(id: string): void {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Invalid artist ID');
    }

    const artist = this.artistService.findOne(id);
    if (!artist) {
      throw new UnprocessableEntityException('Artist not found');
    }

    if (!this.favorites.artists.includes(id)) {
      this.favorites.artists.push(id);
    }
  }

  removeTrackFromFavorites(id: string): void {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Invalid track ID');
    }

    if (!this.favorites.tracks.includes(id)) {
      throw new NotFoundException('Track not found in favorites');
    }

    this.favorites.tracks = this.favorites.tracks.filter(
      (trackId) => trackId !== id,
    );
  }

  removeAlbumFromFavorites(id: string): void {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Invalid album ID');
    }

    if (!this.favorites.albums.includes(id)) {
      throw new NotFoundException('Album not found in favorites');
    }

    this.favorites.albums = this.favorites.albums.filter(
      (albumId) => albumId !== id,
    );
  }

  removeArtistFromFavorites(id: string): void {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Invalid artist ID');
    }

    if (!this.favorites.artists.includes(id)) {
      throw new NotFoundException('Artist not found in favorites');
    }

    this.favorites.artists = this.favorites.artists.filter(
      (artistId) => artistId !== id,
    );
  }

  removeDeletedEntity(
    entityType: 'artist' | 'album' | 'track',
    id: string,
  ): void {
    switch (entityType) {
      case 'artist':
        this.favorites.artists = this.favorites.artists.filter(
          (artistId) => artistId !== id,
        );
        break;
      case 'album':
        this.favorites.albums = this.favorites.albums.filter(
          (albumId) => albumId !== id,
        );
        break;
      case 'track':
        this.favorites.tracks = this.favorites.tracks.filter(
          (trackId) => trackId !== id,
        );
        break;
    }
  }
}
