import { Service } from '../../decorators/service.decorator';
import { ConfigService } from '../config.service';
import { ProfileManager } from './profile/profile-manager';
import { StateManager } from './state/state-manager';

@Service
export class BackendService {
  private readonly apiToken: string;
  public readonly profileManager: ProfileManager;
  public readonly stateManager: StateManager;
  constructor(private readonly config: ConfigService) {
    this.apiToken = config.get<string>('CLIENT_SECRET');
    this.profileManager = new ProfileManager(config);
    this.stateManager = new StateManager(config);
  }
}
