import 'reflect-metadata';
import { Container } from 'inversify';
import { Component } from './types/index.js';
import {
  createRestApplicationContainer,
  RestApplication,
} from './rest/index.js';
import { createUserContainer } from './modules/user/index.js';
import { createOfferContainer } from './modules/offer/offer.container.js';

async function bootstrap() {
  const appContainer = Container.merge(
    createRestApplicationContainer(),
    createUserContainer(),
    createOfferContainer()
  );
  const application = appContainer.get<RestApplication>(
    Component.RestApplication
  );
  await application.init();
}

bootstrap();
