
const cluster = require('cluster'); 
import * as os from 'os';
import { Injectable } from '@nestjs/common';

const numCPUs = os.cpus().length;

@Injectable()
export class ClusterService {
    static clusterize(callback: Function): void {
        console.log(cluster.isPrimary)
        if(cluster.isPrimary){
            console.log(`Master server started on ${process.pid}`);
            for (let i = 0; i < numCPUs-1; i++) {
                cluster.fork();
            }
            cluster.on('exit', (worker) => {
                console.log(`Worker ${worker.process.pid} died. Restarting`);
                cluster.fork();
            })
        } else {
            console.log(`Cluster server started on ${process.pid}`)
            callback();
        }
    }
}
