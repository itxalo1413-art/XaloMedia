import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact, ContactDocument, ContactStatus } from './entities/contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';

type PaginationParams = { limit?: number; page?: number };
const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(Contact.name)
    private readonly contactModel: Model<ContactDocument>,
  ) {}

  create(dto: CreateContactDto): Promise<ContactDocument> {
    const contact = new this.contactModel({
      ...dto,
      status: ContactStatus.NEW,
    });
    return contact.save();
  }

  findAll(params: PaginationParams = {}): Promise<ContactDocument[]> {
    const limit = clampLimit(params.limit);
    const page = clampPage(params.page);
    const skip = (page - 1) * limit;

    return this.contactModel
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()
      .exec() as unknown as Promise<ContactDocument[]>;
  }

  async markRead(id: string): Promise<ContactDocument | null> {
    return this.contactModel
      .findByIdAndUpdate(id, { status: ContactStatus.READ }, { returnDocument: 'after' })
      .exec();
  }
}

function clampLimit(limit?: number) {
  if (!Number.isFinite(limit) || !limit) return DEFAULT_LIMIT;
  return Math.max(1, Math.min(MAX_LIMIT, Math.floor(limit)));
}

function clampPage(page?: number) {
  if (!Number.isFinite(page) || !page) return 1;
  return Math.max(1, Math.floor(page));
}
