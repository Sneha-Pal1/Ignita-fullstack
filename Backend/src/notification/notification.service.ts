import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alert } from '../alerts/entities/alert.entity';

export interface NotificationItem {
  id: string;
  type:
    | 'event_deadline'
    | 'upcoming_event'
    | 'bookmark_reminder'
    | 'new_opportunity'
    | 'internship_alert'
    | 'hackathon_reminder'
    | 'ai_event';
  title: string;
  message: string;
  eventTitle?: string;
  timestamp: Date;
  isRead: boolean;
  icon: string;
  color: string;
  actionUrl?: string;
}

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Alert)
    private readonly alertRepository: Repository<Alert>,
  ) {}

  private toNotification(alert: Alert): NotificationItem {
    const message = alert.message || 'Notification';
    const eventTitle = message.includes(' - ')
      ? message.split(' - ')[0]
      : message;

    return {
      id: alert.id,
      type: 'event_deadline',
      title: alert.read ? 'Alert update' : 'New alert',
      message,
      eventTitle,
      timestamp: alert.createdAt,
      isRead: alert.read,
      icon: '🔔',
      color: 'from-emerald-500 to-teal-500',
      actionUrl: '/alerts',
    };
  }

  async findAllForUser(userId: string): Promise<NotificationItem[]> {
    const alerts = await this.alertRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });

    return alerts.map((alert) => this.toNotification(alert));
  }

  async getUnreadCount(userId: string): Promise<number> {
    const result = await this.alertRepository
      .createQueryBuilder('alert')
      .where('alert.userId = :userId', { userId })
      .andWhere('alert.read = false')
      .getCount();

    return result;
  }

  async markAsRead(userId: string, notificationId: string) {
    return this.alertRepository
      .createQueryBuilder()
      .update(Alert)
      .set({ read: true })
      .where('id = :notificationId', { notificationId })
      .andWhere('userId = :userId', { userId })
      .execute();
  }

  async markAllAsRead(userId: string) {
    return this.alertRepository
      .createQueryBuilder()
      .update(Alert)
      .set({ read: true })
      .where('userId = :userId', { userId })
      .andWhere('read = false')
      .execute();
  }

  async delete(userId: string, notificationId: string) {
    return this.alertRepository
      .createQueryBuilder()
      .delete()
      .from(Alert)
      .where('id = :notificationId', { notificationId })
      .andWhere('userId = :userId', { userId })
      .execute();
  }
}
