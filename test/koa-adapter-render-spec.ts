/* tslint:disable variable-name */
import { Controller, Get, Module, Render } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { KoaAdapter, NestKoaApplication } from '../';
import { ApplicationModule } from './src/app.module';

@Controller()
class TestController {
  @Get('test')
  @Render('index')
  test() {
    return {};
  }

  @Get('test2')
  @Render('index2')
  notexist() {
    return {};
  }
}

@Module({
  imports: [ApplicationModule],
  controllers: [TestController],
})
class TestModule {}

describe('Render (KoaAdapter)', () => {
  let app: NestKoaApplication;

  beforeEach(async () => {
    app = (await Test.createTestingModule({
      imports: [TestModule],
    }).compile()).createNestApplication<NestKoaApplication>(
      new KoaAdapter(),
    );

    app.useStaticAssets(__dirname + '/public', { prefix: '/static' });
    app.setViewEngine({ dir: __dirname + '/fixtures', extension: 'pug' });

    await app.init();
  });

  it('test', () => {
    return request(app.getHttpServer())
      .get('/test')
      .expect(200, '<!DOCTYPE html5><html><head><meta charset="utf-8"/><title>Document</title></head><body><p>basic:jade</p></body></html>');
  });

  it('test2', () => {
    return request(app.getHttpServer())
      .get('/test2')
      .expect(500);
  });

  it('static serve', () => {
    return request(app.getHttpServer())
      .get('/static/asset.txt')
      .expect(200, 'Hello World!\n');
  });

  afterEach(async () => {
    await app.close();
  });
});
