import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('alerts')
@UseGuards(JwtAuthGuard)
export class AlertsController {
  constructor(private readonly alertService: AlertsService) {}

  @Get()
  findAllForUser(@Req() req) {
    return this.alertService.findAllForUser(req.user.id);
  }

  @Post()
  createFromBody(@Body() body: { message: string }, @Req() req) {
    return this.alertService.create(body.message, req.user.id);
  }

  @Post(':message')
  create(@Param('message') message: string, @Req() req) {
    return this.alertService.create(message, req.user.id);
  }

  @Patch(':id/read')
  markAsRead(@Param('id') id: string) {
    return this.alertService.markAsRead(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.alertService.delete(id);
  }
}
