import { Coordinates } from './coordinates.type.js';
import { City } from './city.enum.js';

export type CityCoordinates = Record<City, Coordinates>;
