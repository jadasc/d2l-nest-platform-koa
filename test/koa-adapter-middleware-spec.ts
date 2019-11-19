/* tslint:disable variable-name */
import { Controller, Get, INestApplication, MiddlewareConsumer, Module } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as Koa from 'koa';
import * as request from 'supertest';
import { KoaAdapter } from '../';
import { ApplicationModule } from './src/app.module';

const RETURN_VALUE = 'test';
const SCOPED_VALUE = 'test_scoped';

@Controller()
class TestController {
  @Get('test')
  test() {
    return '';
  }
}

@Module({
  imports: [ApplicationModule],
  controllers: [TestController],
})
class TestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply((_req: Koa.Request, res: Koa.Response) => { res.ctx.res.writeHead(200); res.ctx.res.end(SCOPED_VALUE); })
      .forRoutes(TestController)
      .apply(() => { throw new Error('Test'); })
      .forRoutes('throw-error')
      .apply((_req: Koa.Request, _res: Koa.Response, next: () => void) => { next(); })
      .forRoutes('passthrough')
      .apply((_req: Koa.Request, res: Koa.Response) => { res.ctx.res.writeHead(200); res.ctx.res.end(RETURN_VALUE); })
      .forRoutes('*');
  }
}

describe('Middleware (KoaAdapter)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = (await Test.createTestingModule({
      imports: [TestModule],
    }).compile()).createNestApplication<INestApplication>(
      new KoaAdapter(),
    );

    await app.init();
  });

  it('forRoutes(*)', () => {
    return request(app.getHttpServer())
      .get('/hello')
      .expect(200, RETURN_VALUE);
  });

  it('forRoutes(TestController)', () => {
    return request(app.getHttpServer())
      .get('/test')
      .expect(200, SCOPED_VALUE);
  });

  it('forRoutes(throw-error)', () => {
    return request(app.getHttpServer())
      .get('/throw-error')
      .expect(500);
  });

  it('forRoutes(passthrough)', () => {
    return request(app.getHttpServer())
      .get('/passthrough')
      .expect(200, RETURN_VALUE);
  });

  afterEach(async () => {
    await app.close();
  });
});
