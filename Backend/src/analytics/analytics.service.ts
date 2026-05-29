import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bookmark } from '../bookmark/entities/bookmark.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Bookmark)
    private bookmarkRepository: Repository<Bookmark>,
  ) {}
  async getStats(userId: string) {
    const userBookmarks = await this.bookmarkRepository.find({
      where: { user: { id: userId } },
      relations: ['event'],
      order: { createdAt: 'ASC' },
    });

    const monthBuckets = new Map<string, number>();
    const categoryBuckets = new Map<string, number>();

    for (const bookmark of userBookmarks) {
      const month = new Intl.DateTimeFormat('en-US', {
        month: 'short',
        year: 'numeric',
      }).format(bookmark.createdAt);
      monthBuckets.set(month, (monthBuckets.get(month) ?? 0) + 1);

      const category = String(bookmark.event?.category ?? 'Uncategorized');
      categoryBuckets.set(category, (categoryBuckets.get(category) ?? 0) + 1);
    }

    const eventGrowth = Array.from(monthBuckets.entries()).map(
      ([month, count]) => ({ month, count }),
    );

    const bookmarkActivity = [...eventGrowth];

    const categoryPopularity = Array.from(categoryBuckets.entries())
      .map(([category, count]) => ({ category, count }))
      .sort((left, right) => Number(right.count) - Number(left.count));

    const totalBookmarks = userBookmarks.length;
    const totalEvents = userBookmarks.length;
    const totalUsers = 1;
    const activeUsers = userBookmarks.length > 0 ? 1 : 0;
    const recentUserGrowth = [...eventGrowth];

    return {
      totalEvents,
      totalUsers,
      totalBookmarks,
      eventGrowth,
      bookmarkActivity,
      categoryPopularity,
      activeUsers,
      recentUserGrowth,
    };
  }

  async getEventsGroupedByDate(userId: string) {
    const userBookmarks = await this.bookmarkRepository.find({
      where: { user: { id: userId } },
      relations: ['event'],
      order: { createdAt: 'ASC' },
    });

    const monthBuckets = new Map<string, number>();

    for (const bookmark of userBookmarks) {
      const month = new Intl.DateTimeFormat('en-US', {
        month: 'short',
        year: 'numeric',
      }).format(bookmark.createdAt);
      monthBuckets.set(month, (monthBuckets.get(month) ?? 0) + 1);
    }

    return Array.from(monthBuckets.entries()).map(([month, count]) => ({
      month,
      count,
    }));
  }
}
