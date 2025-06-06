import { Amenities, City, HousingType } from '../../../types/index.js';

export class OfferResponseDto {
  id!: string;
  title!: string;
  description!: string;
  postDate!: Date;
  previewImage!: string;
  images!: string[];
  city!: City;
  isPremium!: boolean;
  rate!: number;
  type!: HousingType;
  bedrooms!: number;
  maxAdults!: number;
  price!: number;
  amenities!: Amenities[];
  latitude!: number;
  longitude!: number;
  isFavorite!: boolean;
}
