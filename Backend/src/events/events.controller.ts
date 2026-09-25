import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { EventSyncService } from './event-sync.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../auth/entities/user.entity';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../auth/enum/user-role.enum';

/**
 * EventsController
 * ----------------
 * Controller exposing API endpoints for event management and real data synchronization.
 */
@Controller('events')
export class EventsController {
  constructor(
    private readonly eventService: EventsService,
    private readonly eventSyncService: EventSyncService, // Injected for manual sync requests
  ) {}

  /**
   * POST /events/sync
   * Admin-only route to manually trigger instant data ingestion from external APIs into PostgreSQL.
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post('sync')
  async syncRealData() {
    await this.eventSyncService.syncAllRealData(); // Triggers real-time contest, job & hackathon sync
    return { message: 'Real-time event data synchronization initiated successfully.' };
  }

  /**
   * POST /events
   * Admin-only route to manually create a new event record.
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  create(@Body() dto: CreateEventDto, @CurrentUser() user: User) {
    return this.eventService.create(dto, user); // Creates event linked to admin user
  }

  /**
   * GET /events
   * Retrieves all opportunities (contests, jobs, internships, hackathons) stored in PostgreSQL.
   */
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.eventService.findAll(); // Fetches all active events ordered by latest created
  }

  /**
   * GET /events/:id
   * Retrieves detailed specifications for a specific event by UUID.
   */
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(id); // Fetches single event details
  }

  /**
   * PATCH /events/:id
   * Admin-only route to update an existing event.
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateEventDto) {
    return this.eventService.update(id, dto); // Updates event details in PostgreSQL
  }

  /**
   * DELETE /events/:id
   * Admin-only route to delete an event from PostgreSQL.
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(id); // Deletes event from DB
  }
}
