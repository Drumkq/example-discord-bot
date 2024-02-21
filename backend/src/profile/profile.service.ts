import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChangeProfileDto } from 'src/models/profile/changeProfile.dto';
import { CreateProfileDto } from 'src/models/profile/createProfile.dto';
import { ProfileModel } from 'src/models/profile/profile.model';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileModel)
    private readonly profileModel: Repository<ProfileModel>,
  ) {}

  public async getProfile(userId: string) {
    const profile = await this.profileModel.findOne({ where: { userId } });

    if (!profile) {
      throw new NotFoundException();
    }

    return profile;
  }

  public async createProfile(dto: CreateProfileDto) {
    const profile = await this.profileModel.findOne({
      where: { userId: dto.userId },
    });

    if (profile) {
      throw new ConflictException();
    }

    return await this.profileModel.save(dto);
  }

  public async patchProfile(userId: string, dto: ChangeProfileDto) {
    const profile = await this.profileModel.findOne({ where: { userId } });

    if (!profile) {
      throw new NotFoundException();
    }

    await this.profileModel.update({ userId }, dto);

    return dto;
  }

  async deleteProfile(userId: string) {
    const profile = await this.profileModel.findOne({ where: { userId } });

    if (!profile) {
      throw new NotFoundException();
    }

    await this.profileModel.delete({ userId });
    return profile;
  }
}
