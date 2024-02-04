import { registerAs } from '@nestjs/config';
import { join } from 'path';
export default registerAs('filesystem', () => ({
  default: 'local',
  disks: {
    local: {
      driver: 'local',
      basePath: join(process.cwd(),'storage','pictures'),
    }
  }})
);