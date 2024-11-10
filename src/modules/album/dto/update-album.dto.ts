import { ApiProperty } from '@nestjs/swagger';

export class UpdateAlbumDto {
  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  year?: number;

  @ApiProperty({ required: false })
  artistId?: string | null;
}
