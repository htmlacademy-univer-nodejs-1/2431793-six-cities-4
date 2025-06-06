import { User } from './user.type.js';
import { HousingType } from './housing-type.enum.js';
import { Amenities } from './amenities.enum.js';
import { City } from './city.enum.js';

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: City;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rate: number;
  type: HousingType;
  bedrooms: number;
  maxAdults: number;
  price: number;
  amenities: Amenities[];
  userId: User;
  comments: number;
  latitude: number;
  longitude: number;
};
