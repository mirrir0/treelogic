import { ObjectId } from "mongodb";
export default class Card {
  constructor(
    public id: ObjectId | string,
    public users:  (ObjectId | string)[],
    public front?: string,
    public back?: string,
    public references?: (ObjectId | string)[],
    public cloze?: boolean
  ) {}
}
