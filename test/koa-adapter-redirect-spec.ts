import { Controller, Get, INestApplication, Module, Redirect } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { KoaAdapter } from '../';

@Controller()
class TestController {
  @Get('test')
  @Redirect('https://d2l.com', 301)
  test() {} // tslint:disable-line no-empty

  @Get('test2')
  @Redirect('https://d2l.com', 301)
  test2() {
    return { url: 'https://d2l.com', statusCode: 302 };
  }
}

@Module({
  controllers: [TestController],
})
class TestModule {}

describe('KoaAdapter Redirect', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = (await Test.createTestingModule({
      imports: [TestModule],
    }).compile()).createNestApplication<INestApplication>(
      new KoaAdapter(),
    );

    await app.init();
  });

  it('/test', () => {
    return request(app.getHttpServer())
      .get('/test')
      .expect(301)
      .expect('Location', 'https://d2l.com');
  });

  it('/test2', () => {
    return request(app.getHttpServer())
      .get('/test2')
      .expect(302)
      .expect('Location', 'https://d2l.com');
  });

  afterEach(async () => {
    await app.close();
  });
});
