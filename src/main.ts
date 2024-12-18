import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { ValidationPipe } from '@nestjs/common'
import { useContainer } from 'class-validator'

import { AllExceptionsFilter } from './common/filters'
import { LoggingInterceptor } from './common/interceptors'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  // Create the NestJS application instance
  const app = await NestFactory.create(AppModule)

  // Obtain the configuration service instance
  const configService = app.get(ConfigService)

  // Configure Swagger for API documentation.
  const swaggerOptions = new DocumentBuilder()
    .setTitle('Company Chat API')
    .setDescription('API documentation for the Company Chat application')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions)
  SwaggerModule.setup('api', app, swaggerDocument)

  // Enable Cross-Origin Resource Sharing (CORS) for the application
  app.enableCors({ origin: '*' })

  // Apply global validation pipe to transform payloads and validate DTOs
  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  // Apply global exception filter to handle all exceptions
  app.useGlobalFilters(new AllExceptionsFilter())

  // Apply global logging interceptor to log responses
  app.useGlobalInterceptors(new LoggingInterceptor())

  // Set up dependency injection container with fallback on errors
  useContainer(app.select(AppModule), { fallbackOnErrors: true })

  // Start the application, listening on the specified port
  const APP_PORT = configService.get('APP_PORT') ?? 3000
  const APP_HOST = configService.get('APP_HOST')
  await app.listen(APP_PORT, APP_HOST, () => {
    console.log(`Server is running on http://${APP_HOST}:${APP_PORT}`)
  })
}

bootstrap()
