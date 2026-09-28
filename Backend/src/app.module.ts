import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { EventsModule } from './events/events.module';
import { AlertsModule } from './alerts/alerts.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth/entities/user.entity';
import { BookmarkModule } from './bookmark/bookmark.module';
import { LinkedinPostModule } from './linkedin-post/linkedin-post.module';
import { Event } from './events/entities/event.entity';
import { Bookmark } from './bookmark/entities/bookmark.entity';
import { AnalyticsModule } from './analytics/analytics.module';
import { NotificationModule } from './notification/notification.module';
import { AdminModule } from './admin/admin.module';
import { Alert } from './alerts/entities/alert.entity';
import { PasswordResetToken } from './auth/entities/password-reset-token.entity';
import { AddMissingEventCategoryEnumValues1710000000000 } from './migrations/1710000000000-AddMissingEventCategoryEnumValues';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || `development`}`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        ssl: {
          rejectUnauthorized: false,
        },
        entities: [User, Bookmark, Event, Alert, PasswordResetToken],
        migrations: [AddMissingEventCategoryEnumValues1710000000000],
        migrationsRun: false,
        synchronize: false,
        logging: true,
      }),
    }),
    AuthModule,
    UserModule,
    EventsModule,
    AlertsModule,
    BookmarkModule,
    LinkedinPostModule,
    AnalyticsModule,
    NotificationModule,
    AdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
