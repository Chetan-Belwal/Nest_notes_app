import { Injectable } from '@nestjs/common';
import { DiskOptions, StorageOptions } from '@squareboat/nest-storage';
import { join } from 'path';

@Injectable()
export class FileStorageConfigService implements StorageOptions {
  default = 'local';
  public disks: Record<string, DiskOptions> = {
    local: {
      driver: 'local',
      basePath: join(process.cwd(),'uploads','pfp'),
    },
    profileDisk: this.getAwsDisk(),
  };

  getAwsDisk(): DiskOptions {
    return {
      driver: 's3',
      accessKey: '',
      bucket: '',
      region: '',
      secretKey: '',
    };
  }
}
