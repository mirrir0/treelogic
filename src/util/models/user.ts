import { ObjectId } from "mongodb";
export default class User {
  constructor(
    public id: ObjectId,
    public username: string,
    public email: string,
    public nodes: ObjectId[]
  ) {}
}
