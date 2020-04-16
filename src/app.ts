import * as Koa from 'koa';
import * as body from 'koa-body';
import * as cors from '@koa/cors';
import * as logger from 'koa-logger';
import { createConnection } from 'typeorm';
import positionRouter from './routers/position.router';
import candidateRouter from './routers/candidate.router';

 
 
 
createConnection().then(connection => { try {
    const app:Koa = new Koa();
    app.use(async (ctx: Koa.Context, next: () => Promise<any>) => { try {
               await next();
             } catch (error) {
               ctx.app.emit('error', error, ctx);
             }
           });
           app.use(logger());
           app.use(cors());
           app.use(body());
           //Begin Routes
           
           app.use(positionRouter.routes());
           app.use(positionRouter.allowedMethods());
           app.use(candidateRouter.routes());
           app.use(candidateRouter.allowedMethods());

           //End Routes
           app.on('error', console.error);
           app.listen(2999);
       } catch (e) {
           console.error(e.stack);
    }
    });
     