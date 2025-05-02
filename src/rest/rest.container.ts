import { Container } from 'inversify';
import { RestApplication } from './rest.application.js';
import { Component } from '../types/index.js';
import { Logger, PinoLogger } from '../libs/logger/index.js';
import { Config, RestConfig, RestSchema } from '../libs/config/index.js';
import {
  DatabaseClient,
  MongoDatabaseClient,
} from '../libs/database-client/index.js';
import { AppExceptionFilter, ExceptionFilter } from '../libs/rest/index.js';

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

  return restApplicationContainer;
}
