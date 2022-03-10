import { User, UserService } from "../protocol/user.protocol";
import { Rpc } from "../rpc";

@Rpc(UserService)
export class UserServiceImpl implements UserService {
  async get(id: number) {
    return null;
  }

  async list(length: number = 1) {
    return Array.from({ length }).fill({
      id: new Date().getTime() + Math.floor(Math.random() * 30),
      name: "NewsNIng",
      age: Math.floor(Math.random() * 30),
    }) as User[];
  }
}
