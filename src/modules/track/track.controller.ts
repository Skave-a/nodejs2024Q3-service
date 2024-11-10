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

import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './track.entity';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tracks' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all tracks',
    type: [Track],
  })
  async getAllTracks() {
    return this.trackService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get track by ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Track ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved track',
    type: Track,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid track ID format',
  })
  @ApiResponse({
    status: 404,
    description: 'Track not found',
  })
  async getTrackById(@Param('id') id: string) {
    if (!this.isValidUUID(id)) {
      throw new BadRequestException('Invalid track ID format');
    }
    return this.trackService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new track' })
  @ApiBody({
    type: CreateTrackDto,
    description: 'Data for creating a new track',
  })
  @ApiResponse({
    status: 201,
    description: 'Track successfully created',
    type: Track,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data',
  })
  async createTrack(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update track' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Track ID to update',
  })
  @ApiBody({
    type: UpdateTrackDto,
    description: 'Data for updating track',
  })
  @ApiResponse({
    status: 200,
    description: 'Track successfully updated',
    type: Track,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid track ID format or invalid data',
  })
  @ApiResponse({
    status: 404,
    description: 'Track not found',
  })
  async updateTrack(
    @Param('id') id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    if (!this.isValidUUID(id)) {
      throw new BadRequestException('Invalid track ID format');
    }
    return this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete track' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Track ID to delete',
  })
  @ApiResponse({
    status: 204,
    description: 'Track successfully deleted',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid track ID format',
  })
  @ApiResponse({
    status: 404,
    description: 'Track not found',
  })
  async deleteTrack(@Param('id') id: string) {
    if (!this.isValidUUID(id)) {
      throw new BadRequestException('Invalid track ID format');
    }
    this.trackService.remove(id);
  }

  private isValidUUID(id: string): boolean {
    const regex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return regex.test(id);
  }
}
