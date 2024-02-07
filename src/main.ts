import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
const methodOverride = require('method-override');
const bodyParser = require('body-parser');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  //Cookie parser
  app.use(cookieParser());

  //Enviroment Config Service
  const configService = app.get(ConfigService);

  //port
  const port = configService.get('PORT');

  const testing = configService.get('filesystem');
  console.log(port);

  //handlebars engine
  app.useStaticAssets(join(process.cwd(), 'public'));
  console.log(join(process.cwd()), 'path');
  app.setBaseViewsDir(join(process.cwd(), 'views'));
  app.setViewEngine('hbs');

  //assest for uploads
  app.useStaticAssets(join(process.cwd(), 'storage/pictures'));
  //Swagger Api Setup
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //Method override
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(
    methodOverride(function (req, res) {
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        const method = req.body._method;
        delete req.body._method;
        return method;
      }
    }),
  );

  await app.listen(port);
}
bootstrap();
