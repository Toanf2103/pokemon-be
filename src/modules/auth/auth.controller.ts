import { Body, Controller, HttpCode, HttpStatus, Post, Req } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'

import { Auth } from '@/common/decorators'
import { AuthService } from './auth.service'
import { LoginRequest, RefreshAccessTokenRequest } from './dto/request'
import {
  AccessTokenResponse,
  AuthTokenResponse,
  LoginResponse,
  ProfileResponse,
} from './dto/response'

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: LoginResponse })
  public async login(@Body() loginRequest: LoginRequest): Promise<LoginResponse> {
    const result = await this.authService.login(loginRequest)
    return result
  }

  @Post('/profile')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: ProfileResponse })
  @Auth()
  public async getProfile(@Req() request): Promise<ProfileResponse> {
    const result = await this.authService.getProfile(request.user)
    return result
  }

  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: AccessTokenResponse })
  public async refreshAccessToken(
    @Body() refreshAccessTokenRequest: RefreshAccessTokenRequest,
  ): Promise<AuthTokenResponse> {
    const result = await this.authService.refreshAccessToken(refreshAccessTokenRequest)
    return result
  }
}
