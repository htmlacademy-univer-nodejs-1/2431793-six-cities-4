import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData } from '../../types/index.js';
import {
  generateRandomValue,
  getRandomItem,
  getRandomItems,
} from '../../helpers/index.js';

const MIN_PRICE = 2000;
const MAX_PRICE = 5000;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const postDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();
    const city = getRandomItem(this.mockData.cities);
    const previewImage = getRandomItem<string>(this.mockData.previewImages);
    const images = getRandomItems<string>(this.mockData.images).join(',');
    const isPremium = generateRandomValue(0, 1) === 1;
    const isFavorite = generateRandomValue(0, 1) === 1;
    const rate = generateRandomValue(0, 5);
    const type = getRandomItem<string>(this.mockData.types);
    const bedrooms = generateRandomValue(1, 7);
    const maxAdults = generateRandomValue(1, 10);
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE);
    const amenities = getRandomItems<string>(this.mockData.amenities).join(',');
    const host = getRandomItem<string>(this.mockData.users);
    const [name, email, avatarUrl, password, typeUser] = host.split(', ');
    const comments = generateRandomValue(0, 100);
    const location = getRandomItem<string>(this.mockData.locations);
    const [latitude, longitude] = location.split(' ');

    return [
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
      name,
      email,
      avatarUrl,
      password,
      typeUser,
      comments,
      latitude,
      longitude,
    ].join('\t');
  }
}
