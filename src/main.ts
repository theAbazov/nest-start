import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule, SwaggerCustomOptions  } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Nest start')
    .setDescription('First application in NESTJS')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config, {});
  const customOptions: SwaggerCustomOptions = {
    customSiteTitle: "First NEST project",
    customfavIcon: 'src/favicon.png',
  }
  SwaggerModule.setup('docs', app, document, customOptions);

  await app.listen(3000).then(() => console.log('started on 3000 port'));
}
bootstrap();
