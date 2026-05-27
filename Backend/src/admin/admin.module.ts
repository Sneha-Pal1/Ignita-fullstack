import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../events/entities/event.entity';
import { User } from '../auth/entities/user.entity';
import { Bookmark } from '../bookmark/entities/bookmark.entity';
import { Alert } from '../alerts/entities/alert.entity';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { EventsModule } from '../events/events.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event, User, Bookmark, Alert]),
    EventsModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
