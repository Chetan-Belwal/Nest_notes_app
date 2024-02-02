import { Module } from '@nestjs/common';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { MyNestJsFormDataConfigService } from './my-nest-js-form-data-config-service.service';

@Module({
    imports:[NestjsFormDataModule.configAsync({useClass:MyNestJsFormDataConfigService})],
    providers: [MyNestJsFormDataConfigService]
})
export class FormDataModule {}
