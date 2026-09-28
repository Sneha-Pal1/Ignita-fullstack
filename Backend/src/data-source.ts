import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './auth/entities/user.entity';
import { Event } from './events/entities/event.entity';
import { Bookmark } from './bookmark/entities/bookmark.entity';
import { Alert } from './alerts/entities/alert.entity';
import { PasswordResetToken } from './auth/entities/password-reset-token.entity';
import { AddMissingEventCategoryEnumValues1710000000000 } from './migrations/1710000000000-AddMissingEventCategoryEnumValues';
import * as dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });
if (!process.env.DATABASE_URL) {
  dotenv.config();
}

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/ignita',
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
  entities: [User, Bookmark, Event, Alert, PasswordResetToken],
  migrations: [AddMissingEventCategoryEnumValues1710000000000],
  synchronize: false,
  logging: true,
});
