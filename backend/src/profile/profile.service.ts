import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ChangeProfileDto } from 'src/models/profile/changeProfile.dto';
import { ProfileModel } from 'src/models/profile/profile.model';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(ProfileModel)
    private readonly profileModel: typeof ProfileModel,
  ) {}

  public async getProfile(userId: string) {
    const profile = await this.profileModel.findOne({ where: { userId } });

    return profile !== null
      ? profile
      : await this.profileModel.create({ userId });
  }

  public async patchProfile(
    userId: string,
    dto: ChangeProfileDto,
  ): Promise<ChangeProfileDto> {
    await this.profileModel.update(dto, { where: { userId: userId } });

    return dto;
  }
}
