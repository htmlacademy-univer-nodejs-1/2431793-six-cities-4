import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  Max,
  MaxLength,
  Min,
  MinLength,
  ArrayMinSize,
  ArrayMaxSize,
  IsNumber,
} from 'class-validator';
import { Amenities } from '../../../types/amenities.enum.js';
import { City } from '../../../types/city.enum.js';
import { HousingType } from '../../../types/housing-type.enum.js';
import { CreateOfferValidationMessage } from './create-offer.messages.js';

export class CreateOfferDto {
  @IsNotEmpty()
  @MinLength(10, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.title.maxLength })
  public title: string;

  @IsNotEmpty()
  @MinLength(20, {
    message: CreateOfferValidationMessage.description.minLength,
  })
  @MaxLength(1024, {
    message: CreateOfferValidationMessage.description.maxLength,
  })
  public description: string;

  @IsNotEmpty()
  @IsEnum(City, { message: CreateOfferValidationMessage.city.invalid })
  public city: City;

  @IsNotEmpty({ message: CreateOfferValidationMessage.image.empty })
  public previewImage: string;

  @IsNotEmpty()
  @IsBoolean()
  public isPremium: boolean;

  @IsNotEmpty()
  @IsEnum(HousingType, { message: CreateOfferValidationMessage.type.invalid })
  public type: HousingType;

  @IsNotEmpty()
  @IsInt({ message: CreateOfferValidationMessage.bedrooms.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.bedrooms.minValue })
  @Max(8, { message: CreateOfferValidationMessage.bedrooms.maxValue })
  public bedrooms: number;

  @IsNotEmpty()
  @IsInt({ message: CreateOfferValidationMessage.price.invalidFormat })
  @Min(100, { message: CreateOfferValidationMessage.price.min })
  @Max(100000, { message: CreateOfferValidationMessage.price.max })
  public price: number;

  @IsNotEmpty()
  @IsInt({ message: CreateOfferValidationMessage.maxAdults.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.maxAdults.minValue })
  @Max(10, { message: CreateOfferValidationMessage.maxAdults.maxValue })
  public maxAdults: number;

  @IsArray({ message: CreateOfferValidationMessage.amenities.invalidFormat })
  @IsEnum(Amenities, {
    each: true,
    message: CreateOfferValidationMessage.amenities.invalidValue,
  })
  @ArrayMinSize(1, { message: CreateOfferValidationMessage.amenities.minSize })
  public amenities: Amenities[];

  @IsNotEmpty()
  @IsNumber(
    {},
    { message: CreateOfferValidationMessage.latitude.invalidFormat }
  )
  @Min(-90, { message: CreateOfferValidationMessage.latitude.minValue })
  @Max(90, { message: CreateOfferValidationMessage.latitude.maxValue })
  public latitude: number;

  @IsNotEmpty()
  @IsNumber(
    {},
    { message: CreateOfferValidationMessage.longitude.invalidFormat }
  )
  @Min(-180, { message: CreateOfferValidationMessage.longitude.minValue })
  @Max(180, { message: CreateOfferValidationMessage.longitude.maxValue })
  public longitude: number;

  @IsNotEmpty()
  public userId: string;
}
