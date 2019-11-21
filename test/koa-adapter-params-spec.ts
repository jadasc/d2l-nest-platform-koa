import { Controller, Get, INestApplication, Module, Param } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { KoaAdapter } from '../index';

@Controller()
class TestController {
  @Get(':param1/:param2/:param3')
  test(@Param() params: object) {
    return params;
  }
}

@Module({
  controllers: [TestController],
})
class TestModule {}

describe('KoaAdapter Params', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = (await Test.createTestingModule({
      imports: [TestModule],
    }).compile()).createNestApplication<INestApplication>(
      new KoaAdapter(),
    );

    await app.init();
  });

  it('/hello1/hello2/hello3', () => {
    return request(app.getHttpServer())
      .get('/hello1/hello2/hello3')
      .expect(200, { param1: 'hello1', param2: 'hello2', param3: 'hello3' });
  });

  afterEach(async () => {
    await app.close();
  });
});
