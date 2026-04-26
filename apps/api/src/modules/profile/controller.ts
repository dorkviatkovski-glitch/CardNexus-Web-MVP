import { ProfileService } from "./service";

const service = new ProfileService();

export const ProfileController = {
  getProfile: (userId?: string) => service.getProfile(userId),
};
