import { NestFactory } from '@nestjs/core';
import { AppModule } from './infra/modules/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ allowedHeaders: '', origin: '*' });

  const config = new DocumentBuilder()
    .setTitle('Bitbucket Sync Service')
    .setDescription('Bitbucket manager. 👍')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT, () => {
    console.log(`✅ URL BASE: http://localhost:${process.env.PORT}`);
    console.log(`🗂️ SWAGGER: http://localhost:${process.env.PORT}/api`);
  });
}
bootstrap();
