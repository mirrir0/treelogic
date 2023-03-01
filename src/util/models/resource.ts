import { ObjectId } from "mongodb";
export default class Resource {
  constructor(
    public id: ObjectId,
    public type: "pdf" | "website" | "substack" | "tweet", 
    public references: ObjectId[],
    public cloze?: boolean
  ) {}
}
