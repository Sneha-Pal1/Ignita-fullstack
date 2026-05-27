import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Event } from '../events/entities/event.entity';
import { User } from '../auth/entities/user.entity';
import { Bookmark } from '../bookmark/entities/bookmark.entity';
import { Alert } from '../alerts/entities/alert.entity';
import { CreateEventDto } from '../events/dto/create-event.dto';
import { UpdateEventDto } from '../events/dto/update-event.dto';
import { EventsService } from '../events/events.service';
import { UserRole } from '../auth/enum/user-role.enum';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Bookmark)
    private readonly bookmarkRepository: Repository<Bookmark>,
    @InjectRepository(Alert)
    private readonly alertRepository: Repository<Alert>,
    private readonly eventsService: EventsService,
  ) {}

  async getOverview() {
    const [totalEvents, totalUsers, totalBookmarks, activeAlerts] =
      await Promise.all([
        this.eventRepository.count(),
        this.userRepository.count(),
        this.bookmarkRepository.count(),
        this.alertRepository.count({ where: { read: false } }),
      ]);

    const [recentEvents, recentUsers, recentAlerts] = await Promise.all([
      this.eventRepository.find({
        relations: { createdBy: true },
        order: { createdAt: 'DESC' },
        take: 5,
      }),
      this.userRepository.find({
        order: { createdAt: 'DESC' },
        take: 5,
      }),
      this.alertRepository.find({
        relations: { user: true },
        order: { createdAt: 'DESC' },
        take: 5,
      }),
    ]);

    return {
      stats: {
        totalEvents,
        totalUsers,
        totalBookmarks,
        activeAlerts,
      },
      recentEvents,
      recentUsers,
      recentAlerts,
      pendingActions: [
        {
          label: 'Review alerts',
          value: activeAlerts,
        },
        {
          label: 'Publish queued events',
          value: Math.max(totalEvents - recentEvents.length, 0),
        },
      ],
    };
  }

  async getEvents() {
    return this.eventRepository.find({
      relations: { createdBy: true },
      order: { createdAt: 'DESC' },
    });
  }

  async getEventById(id: string) {
    return this.eventsService.findOne(id);
  }

  async createEvent(dto: CreateEventDto, user: User) {
    return this.eventsService.create(dto, user);
  }

  async updateEvent(id: string, dto: UpdateEventDto) {
    return this.eventsService.update(id, dto);
  }

  async deleteEvent(id: string) {
    return this.eventsService.remove(id);
  }

  async getUsers() {
    return this.userRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async getAnalytics() {
    const eventGrowth = await this.eventRepository
      .createQueryBuilder('event')
      .select(
        "TO_CHAR(DATE_TRUNC('month', event.createdAt), 'YYYY-MM')",
        'month',
      )
      .addSelect('COUNT(*)', 'count')
      .groupBy('month')
      .orderBy('month', 'ASC')
      .getRawMany();

    const bookmarkActivity = await this.bookmarkRepository
      .createQueryBuilder('bookmark')
      .select(
        "TO_CHAR(DATE_TRUNC('month', bookmark.createdAt), 'YYYY-MM')",
        'month',
      )
      .addSelect('COUNT(*)', 'count')
      .groupBy('month')
      .orderBy('month', 'ASC')
      .getRawMany();

    const categoryPopularity = await this.eventRepository
      .createQueryBuilder('event')
      .select('event.category', 'category')
      .addSelect('COUNT(*)', 'count')
      .groupBy('event.category')
      .orderBy('count', 'DESC')
      .getRawMany();

    const activeUsers = await this.userRepository.count({
      where: {
        createdAt: MoreThanOrEqual(
          new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        ),
      },
    });

    const recentUserGrowth = await this.userRepository
      .createQueryBuilder('user')
      .select(
        "TO_CHAR(DATE_TRUNC('month', user.createdAt), 'YYYY-MM')",
        'month',
      )
      .addSelect('COUNT(*)', 'count')
      .groupBy('month')
      .orderBy('month', 'ASC')
      .getRawMany();

    return {
      eventGrowth,
      bookmarkActivity,
      categoryPopularity,
      activeUsers,
      recentUserGrowth,
    };
  }

  async getAlerts() {
    return this.alertRepository.find({
      relations: { user: true },
      order: { createdAt: 'DESC' },
    });
  }
}
