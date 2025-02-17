import { FileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';
import {
  Offer,
  City,
  Amenities,
  User,
  HousingType,
  UserType,
} from '../../types/index.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(private readonly filename: string) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(
        ([
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
          host,
          comments,
          location,
        ]) => ({
          title,
          description,
          postDate: new Date(postDate),
          city: city as City,
          previewImage,
          images: images.split(';'),
          isPremium: Boolean(isPremium),
          isFavorite: Boolean(isFavorite),
          rate: Number(rate),
          type: type as HousingType,
          bedrooms: Number(bedrooms),
          maxAdults: Number(maxAdults),
          price: Number(price),
          amenities: amenities
            .split(';')
            .map((amenity) => amenity as Amenities),
          host: {
            name: host,
            email: '',
            password: '',
            type: 'regular' as UserType,
            avatarUrl: '',
          } as User,
          comments: Number(comments),
          location: {
            latitude: Number(location.split(';')[0]),
            longitude: Number(location.split(';')[1]),
          },
        })
      );
  }
}
