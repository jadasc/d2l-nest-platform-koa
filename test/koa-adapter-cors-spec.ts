import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as should from 'should';
import * as request from 'supertest';
import { KoaAdapter } from '../';
import { ApplicationModule } from './src/app.module';

describe('KoaAdapter enableCors', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = (await Test.createTestingModule({
      imports: [ApplicationModule],
    }).compile()).createNestApplication<INestApplication>(
      new KoaAdapter(),
    );
  });

  it('origin true', async () => {
    app.enableCors({
      origin: true,
    });
    await app.init();
    return request(app.getHttpServer())
      .get('/hello')
      .set('Origin', 'http://koajs.com')
      .expect(200, 'Hello world!')
      .expect('Access-Control-Allow-Origin', 'http://koajs.com');
  });

  it('origin false', async () => {
    app.enableCors({
      origin: false,
    });
    await app.init();
    return request(app.getHttpServer())
      .get('/hello')
      .set('Origin', 'http://koajs.com')
      .expect(200, 'Hello world!')
      .expect(res => {
        should(res.header['access-control-allow-origin']).be.undefined();
      });
  });

  describe('origin value', () => {
    it('matches', async () => {
      app.enableCors({
        origin: 'http://koajs.com',
      });
      await app.init();
      return request(app.getHttpServer())
        .get('/hello')
        .set('Origin', 'http://koajs.com')
        .expect(200, 'Hello world!')
        .expect('Access-Control-Allow-Origin', 'http://koajs.com');
    });

    it('mismatches', async () => {
      app.enableCors({
        origin: 'http://koajs.com',
      });
      await app.init();
      return request(app.getHttpServer())
        .get('/hello')
        .set('Origin', 'http://koajs-test.com')
        .expect(200, 'Hello world!')
        .expect('Access-Control-Allow-Origin', 'http://koajs.com');
    });
  });

  describe('origin array', () => {
    it('matches', async () => {
      app.enableCors({
        origin: ['http://koajs.com', 'http://koajs-2.com'],
      });
      await app.init();
      return request(app.getHttpServer())
        .get('/hello')
        .set('Origin', 'http://koajs.com')
        .expect(200, 'Hello world!')
        .expect('Access-Control-Allow-Origin', 'http://koajs.com');
    });

    it('mismatches', async () => {
      app.enableCors({
        origin: ['http://koajs.com', 'http://koajs-2.com'],
      });
      await app.init();
      return request(app.getHttpServer())
        .get('/hello')
        .set('Origin', 'http://koajs-test.com')
        .expect(200, 'Hello world!')
        .expect(res => {
          should(res.header['access-control-allow-origin']).be.undefined();
        });
    });
  });

  describe('origin regex', () => {
    it('matches', async () => {
      app.enableCors({
        origin: /http:\/\/koajs-(.*)\.com/,
      });
      await app.init();
      return request(app.getHttpServer())
        .get('/hello')
        .set('Origin', 'http://koajs-blah.com')
        .expect(200, 'Hello world!')
        .expect('Access-Control-Allow-Origin', 'http://koajs-blah.com');
    });

    it('mismatches', async () => {
      app.enableCors({
        origin: /http:\/\/koajs-(.*)\.com/,
      });
      await app.init();
      return request(app.getHttpServer())
        .get('/hello')
        .set('Origin', 'http://koajs.com')
        .expect(200, 'Hello world!')
        .expect(res => {
          should(res.header['access-control-allow-origin']).be.undefined();
        });
    });
  });

  describe('origin array regex', () => {
    it('matches', async () => {
      app.enableCors({
        origin: ['http://koajs.com', /http:\/\/koajs-(.*)\.com/],
      });
      await app.init();
      return request(app.getHttpServer())
        .get('/hello')
        .set('Origin', 'http://koajs.com')
        .expect(200, 'Hello world!')
        .expect('Access-Control-Allow-Origin', 'http://koajs.com');
    });

    it('matches', async () => {
      app.enableCors({
        origin: ['http://koajs.com', /http:\/\/koajs-(.*)\.com/],
      });
      await app.init();
      return request(app.getHttpServer())
        .get('/hello')
        .set('Origin', 'http://koajs-blah.com')
        .expect(200, 'Hello world!')
        .expect('Access-Control-Allow-Origin', 'http://koajs-blah.com');
    });

    it('mismatches', async () => {
      app.enableCors({
        origin: ['http://koajs.com', /http:\/\/koajs-(.*)\.com/],
      });
      await app.init();
      return request(app.getHttpServer())
        .get('/hello')
        .set('Origin', 'http://koaj.com')
        .expect(200, 'Hello world!')
        .expect(res => {
          should(res.header['access-control-allow-origin']).be.undefined();
        });
    });
  });

  describe('origin function', () => {
    it('always fails', () => {
      (() => app.enableCors({
        origin: (_: string, cb) => cb(null, true),
      })).should.throw();
    });
  });

  afterEach(async () => {
    await app.close();
  });
});
