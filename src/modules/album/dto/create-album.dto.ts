import { ApiProperty } from '@nestjs/swagger';

export class CreateAlbumDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  year: number;

  @ApiProperty({ required: false })
  artistId: string | null;
}
