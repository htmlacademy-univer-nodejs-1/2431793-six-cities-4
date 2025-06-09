import { Container } from 'inversify';
import { RestApplication } from './rest.application.js';
import { Component } from '../types/index.js';
import { Logger, PinoLogger } from '../libs/logger/index.js';
import { Config, RestConfig, RestSchema } from '../libs/config/index.js';
import {
  DatabaseClient,
  MongoDatabaseClient,
} from '../libs/database-client/index.js';
import {
  AppExceptionFilter,
  ExceptionFilter,
  ValidationExceptionFilter,
} from '../libs/rest/index.js';
import { HttpErrorExceptionFilter } from '../libs/rest/exception-filter/http-error.exception-filter.js';
import { PathTransformer } from '../libs/rest/transform/path-transformer.js';

export function createRestApplicationContainer() {
  const restApplicationContainer = new Container();

  restApplicationContainer
    .bind<RestApplication>(Component.RestApplication)
    .to(RestApplication)
    .inSingletonScope();
  restApplicationContainer
    .bind<Logger>(Component.Logger)
    .to(PinoLogger)
    .inSingletonScope();
  restApplicationContainer
    .bind<Config<RestSchema>>(Component.Config)
    .to(RestConfig)
    .inSingletonScope();
  restApplicationContainer
    .bind<DatabaseClient>(Component.DatabaseClient)
    .to(MongoDatabaseClient)
    .inSingletonScope();
  restApplicationContainer
    .bind<ExceptionFilter>(Component.ExceptionFilter)
    .to(AppExceptionFilter)
    .inSingletonScope();
  restApplicationContainer
    .bind<ExceptionFilter>(Component.HttpExceptionFilter)
    .to(HttpErrorExceptionFilter)
    .inSingletonScope();
  restApplicationContainer
    .bind<ExceptionFilter>(Component.ValidationExceptionFilter)
    .to(ValidationExceptionFilter)
    .inSingletonScope();
  restApplicationContainer
    .bind<PathTransformer>(Component.PathTransformer)
    .to(PathTransformer)
    .inSingletonScope();
  return restApplicationContainer;
}
