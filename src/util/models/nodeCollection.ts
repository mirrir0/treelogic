import { ObjectId } from "mongodb";
export default class NodeCollection {
  constructor(
    public id: ObjectId,
    public body: string,
    public references: ObjectId[],
    public owners: ObjectId[],
    public shares: ObjectId[]
  ) {}
}