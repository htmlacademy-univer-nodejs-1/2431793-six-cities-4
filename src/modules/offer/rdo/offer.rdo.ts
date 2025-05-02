import { Expose } from 'class-transformer';
import { Amenities, City, HousingType } from '../../../types/index.js';
import { UserEntity } from '../../user/index.js';

export class OfferRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public postDate: Date;

  @Expose()
  public previewImage: string;

  @Expose()
  public images: string[];

  @Expose()
  public city: City;

  @Expose()
  public name: string;

  @Expose()
  public isPremium: boolean;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public rate: number;

  @Expose()
  public type: HousingType;

  @Expose()
  public bedrooms: number;

  @Expose()
  public maxAdults: number;

  @Expose()
  public price: number;

  @Expose()
  public amenities: Amenities[];

  @Expose()
  public host: UserEntity;
}
