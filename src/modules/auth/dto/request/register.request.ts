import { IsString, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class RegisterRequest {
  @ApiProperty({
    description: 'The username for the user',
    example: 'john_doe',
    minLength: 3,
  })
  @IsString()
  @MinLength(3)
  username: string

  @ApiProperty({
    description: 'The password for the user',
    example: 'password123',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password: string
}
