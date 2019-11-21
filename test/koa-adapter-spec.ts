import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { KoaAdapter } from '../index';
import { ApplicationModule } from './src/app.module';

describe('KoaAdapter', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = (await Test.createTestingModule({
      imports: [ApplicationModule],
    }).compile()).createNestApplication<INestApplication>(
      new KoaAdapter(),
    );

    await app.init();
  });

  it('getType returns koa', () => {
    app.getHttpAdapter().getType().should.equal('koa');
  });

  it('GET /hello', () => {
    return request(app.getHttpServer())
      .get('/hello')
      .expect(200, 'Hello world!');
  });

  it('PUT /hello', () => {
    return request(app.getHttpServer())
      .put('/hello')
      .expect(200, 'Hello world!');
  });

  it('/hello?foo=bar', () => {
    return request(app.getHttpServer())
      .get('/hello?foo=bar')
      .expect(200, 'Hello world!');
  });

  it('/404', () => {
    return request(app.getHttpServer())
      .get('/404')
      .expect(404, {
        statusCode: 404,
        error: 'Not Found',
        message: 'Cannot GET /404',
      });
  });

  afterEach(async () => {
    await app.close();
  });
});
