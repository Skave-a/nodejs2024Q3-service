import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshDto {
  @ApiProperty({
    description: 'Refresh token to obtain new Access token',
    example: 'your-refresh-token-here',
  })
  @IsString()
  readonly refreshToken: string;
}
