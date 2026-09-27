import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { EventSyncService } from './event-sync.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [TypeOrmModule.forFeature([Event]), StorageModule],
  controllers: [EventsController],
  providers: [EventsService, EventSyncService],
  exports: [EventsService, EventSyncService],
})
export class EventsModule { }

