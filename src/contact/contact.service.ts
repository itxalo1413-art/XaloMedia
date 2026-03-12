import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact, ContactDocument, ContactStatus } from './entities/contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';

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

  findAll(): Promise<ContactDocument[]> {
    return this.contactModel.find().sort({ createdAt: -1 }).exec();
  }

  async markRead(id: string): Promise<ContactDocument | null> {
    return this.contactModel
      .findByIdAndUpdate(id, { status: ContactStatus.READ }, { returnDocument: 'after' })
      .exec();
  }
}
