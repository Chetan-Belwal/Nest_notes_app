import { Module } from '@nestjs/common';
import { StorageModule } from '@squareboat/nest-storage';
import { FileStorageConfigService } from './services/file-storage-config.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    StorageModule.registerAsync({
        imports: [ConfigService],
        useFactory: (config: ConfigService) => {
          return config.get('filesystem')
        },
        inject: [ConfigService]
      })
  ],
  providers: [FileStorageConfigService],
})
export class FileStorageModule {}
