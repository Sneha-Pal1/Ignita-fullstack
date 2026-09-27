import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { User } from '../auth/entities/user.entity';
import { StorageService } from '../storage/storage.service';
import { UploadedFile } from '../storage/uploaded-file.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EventsService {
  private readonly cloudfrontUrl: string;

  constructor(
    @InjectRepository(Event)
    private readonly eventRepo: Repository<Event>,
    private readonly storageService: StorageService,
    private readonly configService: ConfigService,
  ) {
    // Read once at startup; falls back to empty string so keys are returned
    // as-is in local dev where CloudFront is not configured.
    this.cloudfrontUrl = (
      this.configService.get<string>('AWS_CLOUDFRONT_URL') ?? ''
    ).replace(/\/$/, ''); // strip trailing slash
  }

  /**
   * Converts a stored S3 object key into a CloudFront URL.
   * Absolute URLs (http/https) are returned unchanged so that externally
   * sourced event banners (e.g. from the sync pipeline) are not double-prefixed.
   */
  private resolveImageUrl(bannerImage?: string | null): string | undefined {
    if (!bannerImage) return undefined;
    if (/^https?:\/\//i.test(bannerImage)) return bannerImage;
    if (!this.cloudfrontUrl) return bannerImage; // local dev fallback
    return `${this.cloudfrontUrl}/${bannerImage}`;
  }

  /** Apply resolveImageUrl to a single event in-place and return it. */
  private withResolvedImage(event: Event): Event {
    event.bannerImage = this.resolveImageUrl(event.bannerImage) ?? event.bannerImage;
    return event;
  }

  async create(
    dto: CreateEventDto,
    user: User,
    file?: UploadedFile
  ) {
    let bannerImage = dto.bannerImage;

    if (file) {
      // uploadFile returns the raw S3 key (e.g. events/uuid.jpg)
      bannerImage = await this.storageService.uploadFile(file, 'events');
    }

    const event = this.eventRepo.create({
      ...dto,
      bannerImage,
      startDate: new Date(dto.startDate),
      endDate: new Date(dto.endDate),
      deadline: dto.deadline ? new Date(dto.deadline) : undefined,
      createdBy: user,
    });

    const saved = await this.eventRepo.save(event);
    return this.withResolvedImage(saved);
  }

  async findAll() {
    const events = await this.eventRepo.find({
      relations: { createdBy: true },
      order: { createdAt: 'DESC' },
    });
    return events.map((e) => this.withResolvedImage(e));
  }

  async findOne(id: string) {
    const event = await this.eventRepo.findOne({
      where: { id },
      relations: { createdBy: true },
    });
    if (!event) return null;
    return this.withResolvedImage(event);
  }

  async update(
    id: string,
    dto: UpdateEventDto,
    file?: UploadedFile
  ) {
    let bannerImage = dto.bannerImage;

    if (file) {
      bannerImage = await this.storageService.uploadFile(file, 'events');
    }

    await this.eventRepo.update(id, {
      ...dto,
      ...(file ? { bannerImage } : {}),
      startDate: dto.startDate ? new Date(dto.startDate) : undefined,
      endDate: dto.endDate ? new Date(dto.endDate) : undefined,
      deadline: dto.deadline ? new Date(dto.deadline) : undefined,
    });

    return this.findOne(id); // findOne already calls withResolvedImage
  }

  async remove(id: string) {
    return await this.eventRepo.delete(id);
  }
}