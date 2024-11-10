import { ApiProperty } from '@nestjs/swagger';

export class Track {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  artistId: string;

  @ApiProperty()
  duration: number;
}
