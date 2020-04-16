import * as Koa from 'koa';
import * as Router from 'koa-router';
import { getRepository, Repository } from 'typeorm';
import * as HttpStatus from 'http-status-codes';
import { Candidate } from '../entities/candidate';
import { UniqueKeyViolation } from './errors';
const routerOpts: Router.IRouterOptions = { prefix: '/candidates',
};
const router: Router = new Router(routerOpts);

const get = async function(ctx:Koa.Context) {
    const candidatesRepo:Repository<Candidate> = getRepository(Candidate); 
    const candidates = await candidatesRepo.find({where:{deleted:false}});
     ctx.body = {
       data: { candidates },
    };
};

router.get('/', async (ctx:Koa.Context) => {
    return get(ctx);
});

router.put('/', async (ctx:Koa.Context) => {
    if (!ctx.request.body) {
      ctx.throw(HttpStatus.BAD_REQUEST);
   }
   const candidatesRepo:Repository<Candidate> = getRepository(Candidate); 
   const candidate:Candidate = <Candidate>ctx.request.body;
   const candidateFound = await
   candidatesRepo.findOne({where:{deleted:false,firstName:candidate.firstName,lastName:candidate.lastName}});
    if (candidateFound) {
      throw new UniqueKeyViolation(candidateFound);
   }
   const createdCandidate: Candidate = candidatesRepo.create(candidate); await candidatesRepo.save(createdCandidate);
    return await get(ctx);
});

router.patch('/:id', async (ctx:Koa.Context) => {
    if (!ctx.params) {
      ctx.throw(HttpStatus.BAD_REQUEST);
   }
   const candidatesRepo:Repository<Candidate> = getRepository(Candidate);
   const foundCandidate:Candidate = await candidatesRepo.findOne(ctx.params.id); if (!foundCandidate) {
      ctx.throw(HttpStatus.NOT_FOUND);
    }
   const candidateMerged = candidatesRepo.merge(foundCandidate, JSON.parse(ctx.request.body)); await candidatesRepo.save(candidateMerged);
    return await get(ctx);
});

router.delete('/:id', async (ctx:Koa.Context) => {
    if (!ctx.params) {
      ctx.throw(HttpStatus.BAD_REQUEST);
   }
   const candidatesRepo:Repository<Candidate> = getRepository(Candidate);
   const candidate = await candidatesRepo.findOne(ctx.params.id); if (!candidate) {
      ctx.throw(HttpStatus.NOT_FOUND);
    }
    candidate.deleted = true;
    await candidatesRepo.save(candidate);
    return get(ctx);
   });
    

export default router;