import { ObjectId } from "mongodb";
export default class Note {
  constructor(
    public id: ObjectId,
    public body: string,
    public references: ObjectId[]
  ) {}
}
