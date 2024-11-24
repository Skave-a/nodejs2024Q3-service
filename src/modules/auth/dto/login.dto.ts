import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'Login of the user',
    example: 'user123',
  })
  @IsString()
  readonly login: string;

  @ApiProperty({
    description: 'Password of the user',
    example: 'strongPassword123',
  })
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  readonly password: string;
}
