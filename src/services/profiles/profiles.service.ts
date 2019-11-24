import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Iprofile } from '../../schemas/profile.schema';

@Injectable()
export class ProfilesService {
  constructor(@InjectModel('Profile') private readonly profileModel: Model<Iprofile>) {}

  async create(data): Promise<Iprofile> {
    return await this.profileModel.create(data);
  }

  async update(id: string, data) {
    try {
      return await this.profileModel.updateOne({ _id: id }, data);
    } catch (e) {
      return false;
    }
  }

  async destroy(id: string) {
    try {
      return await this.profileModel.deleteOne({ _id: id });
    } catch (e) {
      return false;
    }
  }

  async findOne<T>(id: string): Promise<boolean | Iprofile> {
    try {
      return await this.profileModel.findById(id);
    } catch (e) {
      return false;
    }
  }

  async findAll<T>(where: object): Promise<Iprofile[]> {
      return await this.profileModel.find(where).exec();
  }

}
