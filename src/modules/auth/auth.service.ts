import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { plainToInstance } from 'class-transformer'
import { Repository } from 'typeorm'

import { BcryptUtil } from '@/common/utils'
import { User } from '@/database/entities'
import { LoginRequest, RefreshAccessTokenRequest } from './dto/request'
import {
  AccessTokenResponse,
  AuthTokenResponse,
  LoginResponse,
  ProfileResponse,
  RefreshTokenResponse,
} from './dto/response'

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  public async login(loginRequest: LoginRequest): Promise<LoginResponse> {
    const { username, password } = loginRequest

    const user = await this.userRepository.findOneBy({
      username,
    })
    if (!user) {
      throw new BadRequestException('Email hoặc mật khẩu không đúng. Vui lòng thử lại.')
    }

    const isPasswordValid = await BcryptUtil.validatePassword(password, user.password)
    if (!isPasswordValid) {
      throw new BadRequestException('Email hoặc mật khẩu không đúng. Vui lòng thử lại.')
    }

    return this.buildLoginResponse(user)
  }

  public async getProfile(user: User): Promise<ProfileResponse> {
    return this.transformToProfileResponse(user)
  }

  public async refreshAccessToken(
    refreshAccessTokenRequest: RefreshAccessTokenRequest,
  ): Promise<AuthTokenResponse> {
    const { userId } = this.jwtService.verify(refreshAccessTokenRequest.refreshToken, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
    })

    const user = await this.userRepository.findOneBy({
      id: userId,
    })
    if (!user) {
      throw new UnauthorizedException('Người dùng không tồn tại.')
    }

    return this.buildAuthTokenResponse(user)
  }

  private buildLoginResponse(user: User): LoginResponse {
    return {
      ...this.buildAuthTokenResponse(user),
      userProfile: this.transformToProfileResponse(user),
    }
  }

  private buildAuthTokenResponse(user: User): AuthTokenResponse {
    return {
      ...this.generateAccessToken(user),
      ...this.generateRefreshToken(user),
    }
  }

  private generateAccessToken(user: User): AccessTokenResponse {
    const payload = { userId: user.id }
    const accessToken = this.jwtService.sign(payload)
    return {
      accessToken,
      accessTokenExpiresIn: parseInt(this.configService.get('JWT_ACCESS_TOKEN_EXPIRES_IN')),
    }
  }

  private generateRefreshToken(user: User): RefreshTokenResponse {
    const payload = { userId: user.id }
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_REFRESH_TOKEN_EXPIRES_IN')}s`,
    })
    return {
      refreshToken,
      refreshTokenExpiresIn: parseInt(this.configService.get('JWT_REFRESH_TOKEN_EXPIRES_IN')),
    }
  }

  private transformToProfileResponse(user: User): ProfileResponse {
    return plainToInstance(ProfileResponse, user, {
      excludeExtraneousValues: true,
    })
  }
}
