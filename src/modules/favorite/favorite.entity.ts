import {
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop,
} from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    collection: 'favorites',
  },
})
export class FavoriteEntity extends defaultClasses.TimeStamps {
  @prop({ required: true, type: String })
  public userId!: string;

  @prop({ required: true, type: String })
  public offerId!: string;
}

export const FavoriteModel = getModelForClass(FavoriteEntity);
