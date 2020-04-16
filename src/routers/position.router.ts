import * as Koa from 'koa';
import * as Router from 'koa-router';
import { getRepository, Repository } from 'typeorm';
import * as HttpStatus from 'http-status-codes';
import { Position } from '../entities/position';
import { UniqueKeyViolation } from './errors';
const routerOpts: Router.IRouterOptions = { prefix: '/positions',
};
const router: Router = new Router(routerOpts);


const get = async function(ctx:Koa.Context) {
    const positionsRepo:Repository<Position> = getRepository(Position); 
    const positions = await positionsRepo.find({where:{deleted:false}});
     ctx.body = {
       data: { positions },
    };
};

router.get('/', async (ctx:Koa.Context) => {
    return get(ctx);
});


router.put('/', async (ctx:Koa.Context) => {
    if (!ctx.request.body) {
      ctx.throw(HttpStatus.BAD_REQUEST);
   }
   const positionsRepo:Repository<Position> = getRepository(Position); 
   const position:Position = <Position>ctx.request.body;
   const positionFound = await
   positionsRepo.findOne({where:{deleted:false,title:position.title,level:position.level}});
    if (positionFound) {
      throw new UniqueKeyViolation(positionFound);
   }
   const createdPosition: Position = positionsRepo.create(position); 
   await positionsRepo.save(createdPosition);
    return await get(ctx);
});

router.patch('/:id', async (ctx:Koa.Context) => {
    if (!ctx.params) {
      ctx.throw(HttpStatus.BAD_REQUEST);
   }
   const positionsRepo:Repository<Position> = getRepository(Position);
   const foundPosition:Position = await positionsRepo.findOne(ctx.params.id); 
   if (!foundPosition) {
      ctx.throw(HttpStatus.NOT_FOUND);
    }
   const positionMerged = positionsRepo.merge(foundPosition, JSON.parse(ctx.request.body)); 
   await positionsRepo.save(positionMerged);
    return await get(ctx);
});

router.delete('/:id', async (ctx:Koa.Context) => {
    if (!ctx.params) {
      ctx.throw(HttpStatus.BAD_REQUEST);
   }
   const positionsRepo:Repository<Position> = getRepository(Position);
   const position = await positionsRepo.findOne(ctx.params.id); if (!position) {
      ctx.throw(HttpStatus.NOT_FOUND);
    }
    position.deleted = true;
    await positionsRepo.save(position);
    return get(ctx);
   });
    

export default router;
 