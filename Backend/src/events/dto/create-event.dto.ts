import {
  IsArray,
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { EventCategory } from '../enums/event-category.enum';
import { EventType } from '../enums/event-type.enum';

export class CreateEventDto {
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsDateString()
  startDate!: string;

  @IsDateString()
  endDate!: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsDateString()
  deadline?: string;

  @IsOptional()
  @IsUrl()
  bannerImage?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsEnum(EventCategory)
  category!: EventCategory;

  @IsEnum(EventType)
  mode!: EventType;

  @IsOptional()
  @IsString()
  organizer?: string;

  @IsOptional()
  @IsString()
  registrationLink?: string;
}
