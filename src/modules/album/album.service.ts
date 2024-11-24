import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { Album } from './album.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  private readonly albums: Album[] = [];

  findAll(): Album[] {
    return this.albums;
  }

  findOne(id: string): Album {
    if (!this.isValidUUID(id)) {
      throw new BadRequestException('Invalid album ID format');
    }
    const album = this.albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  create(createAlbumDto: CreateAlbumDto): Album {
    const album: Album = {
      id: uuidv4(),
      ...createAlbumDto,
    };
    this.albums.push(album);
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): Album {
    const album = this.findOne(id);
    Object.assign(album, updateAlbumDto);
    return album;
  }

  remove(id: string): void {
    const index = this.albums.findIndex((album) => album.id === id);
    if (index === -1) {
      throw new NotFoundException('Album not found');
    }
    this.albums.splice(index, 1);
  }

  private isValidUUID(id: string): boolean {
    const regex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return regex.test(id);
  }
}
