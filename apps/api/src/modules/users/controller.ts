import { UsersService } from "./service";

const service = new UsersService();

export const UsersController = {
  findById: (userId: string) => service.findById(userId),
};
