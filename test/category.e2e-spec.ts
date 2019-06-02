import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { CategoryModule } from '../src/api/category/category.module';
import { ApiErrorCode } from '../src/common';
import { CategoryService } from '../src/api/category/category.service';
import { INestApplication } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, EnvConfig, ConfigService, ConfigValidate } from '../src//config';

describe('CategoryController (e2e)', () => {
  let app: INestApplication;

  const categoryService = {
    findAll: () => ({}),
    findById: () => ({}),
    create: () => ({}),
    updateById: () => ({}),
    deleteById: () => ({}),
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        CategoryModule,
        ConfigModule.forRoot<EnvConfig>(null, ConfigValidate.validateInput),
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            uri: configService.get('MONGODB_URI'),
            useNewUrlParser: true,
          }),
          inject: [ConfigService],
        }),
      ],
    })
      .overrideProvider(CategoryService)
      .useValue(categoryService)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('/POST /api/categories', done => {
    request(app.getHttpServer())
      .post('/categories')
      .send({
        name: '计算机',
        description: '计算机科学与技术'
      })
      .expect(201)
      .end((error, response) => {
        if (error) {
          return done.fail(error);
        }
        expect(response.body.code).toEqual(ApiErrorCode.SUCCESS);
        expect(response.body).not.toBeNull();
        console.log('categoryId ' + JSON.stringify(response.body));
        done();
      });
  });

  it('/GET /api/categories/:id', done => {
    
    request(app.getHttpServer())
      .get('/categories/5cf27fa76bb399134ef42b1d')
      .expect(200)
      .end((error, response) => {
        if (error) {
          return done.fail(error);
        }
        expect(response.body.code).toEqual(ApiErrorCode.SUCCESS);
        expect(response.body).not.toBeNull();
        console.log(JSON.stringify(response.body));
        done();
      });
  });

  afterAll(async () => {
    await app.close();
  });

});
