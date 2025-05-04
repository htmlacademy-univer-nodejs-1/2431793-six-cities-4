import { Container } from 'inversify';
import { FavoriteEntity, FavoriteModel } from './favorite.entity.js';
import { Component } from '../../types/index.js';
import { types } from '@typegoose/typegoose';

export function createFavoriteContainer() {
  const commentContainer = new Container();

  commentContainer
    .bind<types.ModelType<FavoriteEntity>>(Component.FavoriteModel)
    .toConstantValue(FavoriteModel);

  return commentContainer;
}
