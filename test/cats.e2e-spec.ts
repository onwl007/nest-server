import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { ApiErrorCode } from '../src/common';
import { INestApplication } from '@nestjs/common';
import { CatsModule } from '../src/api/cats/cats.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsService } from '../src/api/cats/cats.service';

describe('CatsController (e2e)', () => {
  let app: INestApplication;

  const catsService = {
    create: () => ({}),
    findAll: () => ({}),
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        CatsModule,
        MongooseModule.forRootAsync({
          useFactory: () => ({
            uri: 'mongodb://localhost/blog',
          }),
        }),
      ],
    })
      .overrideProvider(CatsService)
      .useValue(catsService)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('/POST /api/cats', done => {
    request(app.getHttpServer())
      .post('/cats')
      .send({
        name: '咪咪',
        age: 2,
        breed: '英短',
      })
      .expect(201)
      .end((error, response) => {
        if (error) {
          return done.fail(error);
        }
        expect(response.body.code).toEqual(ApiErrorCode.SUCCESS);
        expect(response.body).not.toBeNull();
        done();
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
