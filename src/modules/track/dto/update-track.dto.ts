import { ApiProperty } from '@nestjs/swagger';

export class UpdateTrackDto {
  @ApiProperty({ required: false })
  title?: string;

  @ApiProperty({ required: false })
  artistId?: string;

  @ApiProperty({ required: false })
  duration?: number;
}
