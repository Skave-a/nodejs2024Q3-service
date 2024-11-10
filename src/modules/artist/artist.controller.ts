import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Artist } from './artist.entity';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  @ApiOperation({ summary: 'Get all artists' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all artists',
    type: [Artist],
  })
  async getAllArtists() {
    return this.artistService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get artist by ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Artist ID',
  })
  @ApiResponse({
    status: 204,
    description: 'Successfully retrieved artist',
    type: Artist,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid artist ID format',
  })
  @ApiResponse({
    status: 404,
    description: 'Artist not found',
  })
  async getArtistById(@Param('id') id: string) {
    if (!this.isValidUUID(id)) {
      throw new BadRequestException('Invalid artist ID format');
    }
    return this.artistService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new artist' })
  @ApiBody({
    type: CreateArtistDto,
    description: 'Data for creating a new artist',
  })
  @ApiResponse({
    status: 201,
    description: 'Artist successfully created',
    type: Artist,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data',
  })
  async createArtist(@Body() createArtistDto: CreateArtistDto) {
    if (!createArtistDto.name || !createArtistDto.grammy) {
      throw new BadRequestException('Missing required fields: name or grammy');
    }
    return this.artistService.create(createArtistDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update artist' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Artist ID to update',
  })
  @ApiBody({
    type: UpdateArtistDto,
    description: 'Data for updating artist',
  })
  @ApiResponse({
    status: 200,
    description: 'Artist successfully updated',
    type: Artist,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid artist ID format or invalid data',
  })
  @ApiResponse({
    status: 404,
    description: 'Artist not found',
  })
  async updateArtist(
    @Param('id') id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    if (!this.isValidUUID(id)) {
      throw new BadRequestException('Invalid artist ID format');
    }
    return this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete artist' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Artist ID to delete',
  })
  @ApiResponse({
    status: 204,
    description: 'Artist successfully deleted',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid artist ID format',
  })
  @ApiResponse({
    status: 404,
    description: 'Artist not found',
  })
  async deleteArtist(@Param('id') id: string) {
    if (!this.isValidUUID(id)) {
      throw new BadRequestException('Invalid artist ID format');
    }
    this.artistService.remove(id);
  }

  private isValidUUID(id: string): boolean {
    const regex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return regex.test(id);
  }
}
