import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvService } from './Enviroment/env.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
var methodOverride = require('method-override')
var bodyParser = require('body-parser')



async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  //Cookie parser
  app.use(cookieParser());
  
  //Enviroment Config Service
  const configService = app.get(EnvService);

  //port
  const port = configService.port;

  //handlebars engine 
  app.useStaticAssets(join(__dirname, '..', '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', '..', 'views'));
  app.setViewEngine('hbs');                                                                             
  
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
  app.use(bodyParser.urlencoded({extended : false}))
  app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
     
      var method = req.body._method
      delete req.body._method
      return method
    }
  }))


  await app.listen(port);
}
bootstrap();


