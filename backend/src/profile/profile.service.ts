import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChangeProfileDto } from 'src/models/profile/changeProfile.dto';
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

    return profile !== null
      ? profile
      : await this.profileModel.save({ userId });
  }

  public async patchProfile(
    userId: string,
    dto: ChangeProfileDto,
  ): Promise<ChangeProfileDto> {
    await this.profileModel.update({ userId }, dto);

    return dto;
  }
}
