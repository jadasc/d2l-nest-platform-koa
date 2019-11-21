import { Controller, Get, INestApplication, Module } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Readable } from 'stream';
import * as request from 'supertest';
import { KoaAdapter } from '../index';

@Controller()
class TestController {
  @Get('null')
  null() {
    return null;
  }

  @Get('buffer')
  buffer() {
    return Buffer.from('hello world');
  }

  @Get('string')
  string() {
    return 'string';
  }

  @Get('json')
  json() {
    return { json: true };
  }

  @Get('stream')
  stream() {
    const s = new Readable();
    s.push('hello world');
    s.push(null);

    return s;
  }
}

@Module({
  controllers: [TestController],
})
class TestModule {}

describe('KoaAdapter Reply', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = (await Test.createTestingModule({
      imports: [TestModule],
    }).compile()).createNestApplication<INestApplication>(
      new KoaAdapter(),
    );

    await app.init();
  });

  it('/null', () => {
    return request(app.getHttpServer())
      .get('/null')
      .expect(204, '');
  });

  it('/buffer', () => {
    return request(app.getHttpServer())
      .get('/buffer')
      .expect(200)
      .expect('content-type', 'application/octet-stream')
      .expect('content-length', '11');
  });

  it('/string', () => {
    return request(app.getHttpServer())
      .get('/string')
      .expect(200, 'string');
  });

  it('/json', () => {
    return request(app.getHttpServer())
      .get('/json')
      .expect(200, { json: true });
  });

  it('/stream', () => {
    return request(app.getHttpServer())
      .get('/stream')
      .expect(200)
      .expect('content-type', 'application/octet-stream');
  });

  afterEach(async () => {
    await app.close();
  });
});
