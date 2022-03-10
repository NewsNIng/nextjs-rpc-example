export const UserService = Symbol("UserService");

export interface UserService {
  list(length?: number): Promise<User[]>;
  get(id: number): Promise<User | null>;
}

export interface User {
  id: number;
  name: string;
  age: number;
}
