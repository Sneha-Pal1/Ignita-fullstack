import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bookmark } from './entities/bookmark.entity';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { Event } from '../events/entities/event.entity';
import { EventCategory } from '../events/enums/event-category.enum';
import { EventType } from '../events/enums/event-type.enum';
@Injectable()
export class BookmarkService {
  constructor(
    @InjectRepository(Bookmark)
    private readonly bookmarkRepo: Repository<Bookmark>,
    @InjectRepository(Event)
    private readonly eventRepo: Repository<Event>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(userId: string, eventId: string) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const event = await this.eventRepo.findOne({ where: { id: eventId } });
    if (!event) throw new NotFoundException('Event not found');

    const bookmark = this.bookmarkRepo.create({ user, event });
    return await this.bookmarkRepo.save(bookmark);
  }

  async createBySlug(userId: string, eventSlug: string, eventTitle: string) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    // Try to find event by title (since we don't have slug in Event entity)
    let event = await this.eventRepo.findOne({
      where: { title: eventTitle },
    });

    // If event doesn't exist, create it
    if (!event) {
      const newEvent = new Event();
      newEvent.title = eventTitle;
      newEvent.category = EventCategory.WORKSHOP;
      newEvent.mode = EventType.ONLINE;
      event = await this.eventRepo.save(newEvent);
    }

    // Check if bookmark already exists
    const existingBookmark = await this.bookmarkRepo.findOne({
      where: { user: { id: userId }, event: { id: event.id } },
    });

    if (existingBookmark) {
      return existingBookmark;
    }

    const bookmark = new Bookmark();
    bookmark.user = user;
    bookmark.event = event;
    return await this.bookmarkRepo.save(bookmark);
  }

  async findAll() {
    return await this.bookmarkRepo.find({ relations: ['user', 'event'] });
  }

  async findByUserId(userId: string) {
    return await this.bookmarkRepo.find({
      where: { user: { id: userId } },
      relations: ['user', 'event'],
    });
  }

  async findOne(id: string) {
    return await this.bookmarkRepo.findOne({
      where: { id },
      relations: ['user', 'event'],
    });
  }

  async remove(id: string) {
    const result = await this.bookmarkRepo.delete(id);
    if (result.affected === 0)
      throw new NotFoundException('Bookmark not found');
    return { message: 'Bookmark deleted successfully' };
  }
}
