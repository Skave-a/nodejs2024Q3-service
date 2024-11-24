import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignupDto {
  @ApiProperty({
    description: 'Login for the new user',
    example: 'newUser',
  })
  @IsString()
  readonly login: string;

  @ApiProperty({
    description: 'Password for the new user',
    example: 'mySecurePassword123',
  })
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  readonly password: string;
}
