import { ApiProperty } from '@nestjs/swagger';

export class CreateTrackDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  artistId: string;

  @ApiProperty()
  duration: number;
}
