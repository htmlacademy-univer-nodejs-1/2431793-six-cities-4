import {
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from '@typegoose/typegoose';
import { UserEntity } from '../user/index.js';
import { City } from '../../types/city.enum.js';
import { HousingType } from '../../types/housing-type.enum.js';
import { Amenities } from '../../types/amenities.enum.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
  },
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ type: String, trim: true, required: true })
  public title!: string;

  @prop({ type: String, trim: true })
  public description!: string;

  @prop({ type: Date })
  public postDate!: Date;

  @prop({ type: String })
  public previewImage!: string;

  @prop({ type: () => [String] })
  public images!: string[];

  @prop({
    type: String,
    enum: City,
  })
  public city!: City;

  @prop({ type: Boolean })
  public isPremium!: boolean;

  @prop({ type: Boolean })
  public isFavorite!: boolean;

  @prop({ type: Number, default: 1, min: 1, max: 5 })
  public rate!: number;

  @prop({
    type: String,
    enum: HousingType,
  })
  public type!: HousingType;

  @prop({ type: Number })
  public bedrooms!: number;

  @prop({ type: Number })
  public maxAdults!: number;

  @prop({ type: Number })
  public price!: number;

  @prop({ type: () => [String], enum: Amenities })
  public amenities!: Amenities[];

  @prop({ type: Number, required: true, min: -90, max: 90 })
  public latitude!: number;

  @prop({ type: Number, required: true, min: -180, max: 180 })
  public longitude!: number;

  @prop({ type: Number, required: true, default: 0 })
  public commentCount!: number;

  @prop({
    ref: () => UserEntity,
    required: true,
  })
  public userId!: Ref<UserEntity>;
}

export const OfferModel = getModelForClass(OfferEntity);
