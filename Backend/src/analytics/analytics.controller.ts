import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../auth/entities/user.entity';

@Controller('analytics')
@UseGuards(JwtAuthGuard)
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get()
  async getStats(@CurrentUser() user: User) {
    return this.analyticsService.getStats(user.id);
  }

  @Get('events-by-month')
  async getEventsByMonth(@CurrentUser() user: User) {
    return this.analyticsService.getEventsGroupedByDate(user.id);
  }
}
