import { ParamsDictionary } from 'express-serve-static-core';
import { City } from '../../../types/city.enum.js';

export type ParamCity =
  | {
      city: City;
    }
  | ParamsDictionary;
