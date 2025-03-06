import {
  Offer,
  City,
  Amenities,
  User,
  HousingType,
  UserType,
  Coordinates,
} from '../types/index.js';

export function createOffer(offerData: string): Offer {
  const [
    title,
    description,
    postDate,
    city,
    previewImage,
    images,
    isPremium,
    isFavorite,
    rate,
    type,
    bedrooms,
    maxAdults,
    price,
    amenities,
    hostName,
    hostEmail,
    hostAvatarUrl,
    hostPassword,
    hostType,
    comments,
    latitude,
    longitude,
  ] = offerData.replace('\n', '').split('\t');

  const user = {
    name: hostName || '',
    email: hostEmail || '',
    avatarUrl: hostAvatarUrl || '',
    password: hostPassword || '',
    type: (hostType as UserType) || UserType.Regular,
  } as User;

  return {
    title: title || '',
    description: description || '',
    postDate: new Date(postDate) || new Date(),
    city: (city as City) || City.Paris,
    previewImage: previewImage || '',
    images: images.split(',') || [],
    isPremium: Boolean(isPremium) || false,
    isFavorite: Boolean(isFavorite) || false,
    rate: Number(rate) || 0,
    type: (type as HousingType) || HousingType.Apartment,
    bedrooms: Number(bedrooms) || 0,
    maxAdults: Number(maxAdults) || 1,
    price: Number(price) || 0,
    amenities:
      amenities.split(',').map((amenity) => amenity as Amenities) || [],
    host: user,
    comments: Number(comments) || 0,
    location: {
      latitude: latitude || 0,
      longitude: longitude || 0,
    } as Coordinates,
  };
}
