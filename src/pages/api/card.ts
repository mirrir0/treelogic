import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import { connectToDatabase, collections } from "@/util/db";
import Card from "@/util/models/card";

interface PostCardsRequest {
  cards: Card[];
}

async function PostCard(req: NextApiRequest, res: NextApiResponse) {
  try {
    let request = req.body as PostCardsRequest;
	let results: ObjectId[] = [];
	request.cards.map(async (card : Card) => {
    	const result = await collections.cards.insertOne(card);
		results.push(result.insertedId);
	});
    res.status(201).json(results);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}

interface PutCardsRequest {
  cards: Card[];
}

async function PutCards(req: NextApiRequest, res: NextApiResponse) {
  try {
    const request = req.body as PutCardsRequest;
    const cards = request.cards;
	let modifiedCount = 0;
    await cards.map(async (card: Card) => {
      const result = await collections.cards.updateOne({ _id: card.id }, card);
	  modifiedCount += result.modifiedCount
    });
    res.status(200).json(modifiedCount > 0 ? cards : {});
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}

interface DeleteCardsRequest {
	ids: ObjectId[]
}

async function DeleteCards(req: NextApiRequest, res: NextApiResponse) {
      try {
		const request = req.body as DeleteCardsRequest;
        const result = await collections.cards.deleteOne({
          _id: new ObjectId(id),
        });
        res.status(200).json(result.deletedCount > 0 ? { id } : {});
      } catch (err: any) {
        res.status(500).json({ message: err.message });
      }
}
interface GetCardRequest {
  id?: number;
  ids?: number[];
}

async function GetCard(req: NextApiRequest, res: NextApiResponse) {
  try {
    let request = req.body as GetCardRequest;
    if ("id" in request) {
      let card = await collections.cards.findOne({ id: request.id });
      res.status(200).json(card);
    }
    if ("ids" in request) {
      let cards = await collections.cards.find({ id: request.ids });
      res.status(200).json(cards);
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase();

  let method = req.method;
  switch (method) {
    case "GET":
      await GetCard(req, res);
      break;
    case "POST":
      await PostCard(req, res);
      break;
    case "PUT":
		await PutCards(req, res);
      break;
    case "DELETE":
		await DeleteCards(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
