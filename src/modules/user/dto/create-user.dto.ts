import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'skave-a',
    description: 'user login',
  })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({
    example: '12345678',
    description: 'user password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
