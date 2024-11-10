import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Album } from './album.entity';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  @ApiOperation({ summary: 'Get all albums' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all albums',
    type: [Album],
  })
  async getAllAlbums() {
    return this.albumService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get album by ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Album ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved album',
    type: Album,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid album ID format',
  })
  @ApiResponse({
    status: 404,
    description: 'Album not found',
  })
  async getAlbumById(@Param('id') id: string) {
    if (!this.isValidUUID(id)) {
      throw new BadRequestException('Invalid album ID format');
    }
    const album = this.albumService.findOne(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  @Post()
  @ApiOperation({ summary: 'Create a new album' })
  @ApiBody({
    type: CreateAlbumDto,
    description: 'Data for creating a new album',
  })
  @ApiResponse({
    status: 201,
    description: 'Album successfully created',
    type: Album,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data',
  })
  @HttpCode(HttpStatus.CREATED)
  async createAlbum(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update album' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Album ID to update',
  })
  @ApiBody({
    type: UpdateAlbumDto,
    description: 'Data for updating album',
  })
  @ApiResponse({
    status: 200,
    description: 'Album successfully updated',
    type: Album,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid album ID format or invalid data',
  })
  @ApiResponse({
    status: 404,
    description: 'Album not found',
  })
  async updateAlbum(
    @Param('id') id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    if (!this.isValidUUID(id)) {
      throw new BadRequestException('Invalid album ID format');
    }
    const album = this.albumService.findOne(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete album' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Album ID to delete',
  })
  @ApiResponse({
    status: 204,
    description: 'Album successfully deleted',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid album ID format',
  })
  @ApiResponse({
    status: 404,
    description: 'Album not found',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbum(@Param('id') id: string) {
    if (!this.isValidUUID(id)) {
      throw new BadRequestException('Invalid album ID format');
    }
    const album = this.albumService.findOne(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    this.albumService.remove(id);
  }

  private isValidUUID(id: string): boolean {
    const regex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return regex.test(id);
  }
}
