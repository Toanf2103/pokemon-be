import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

export class ProfileResponse {
  @ApiProperty()
  @Expose()
  id: string

  @ApiProperty()
  @Expose()
  username: string
}
