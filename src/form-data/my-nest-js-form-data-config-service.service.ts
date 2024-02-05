import { NestjsFormDataConfigFactory, FormDataInterceptorConfig, FileSystemStoredFile } from "nestjs-form-data";

export class MyNestJsFormDataConfigService implements NestjsFormDataConfigFactory {
    configAsync(): Promise<FormDataInterceptorConfig> | FormDataInterceptorConfig {
      return {
        storage: FileSystemStoredFile,
        fileSystemStoragePath: '/tmp/nestjs-fd',
        // autoDeleteFile:false
      };
    }
  }