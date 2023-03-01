import { useState } from "react";
import Card from "@/util/models/card";
import FlashCardEditor from "./CardComponents/Card";

const dummyCards: Card[] = [
  new Card(
    "1",
    ["1"],
    "What is the capital of **France**?",
    "The capital of France is Paris.",
    undefined,
    true
  ),
  new Card(
    "5",
    ["1"],
    "testing clozed latex {{$\\pi$}} $= {{3.14159}}$",
    "$12 \\times 12 = 144$",
    
    undefined,
    true
  ),
  new Card(
    "2",
    ["1"],
    "$\\sqrt 4 = 2$, some things some things $\\pi = 3.14159$ more text",
    "#bottom text\n##sub text\n`code`\n$$\nx^{2}\n$$\n",
    undefined,
    true
  ),
  new Card(
    "3",
    ["2"],
    "The largest planet in our solar system is {{Jupiter}}.",
    "",
    ["4"],
    true
  ),
  new Card(
    "4",
    ["2"],
    "What is the name of the largest moon of Jupiter?",
    "The largest moon of Jupiter is Ganymede.",
    undefined,
    false
  ),
];
const CardMock = () => {
  const [cards, setCards] = useState<Card[]>(dummyCards);
  const handleSaveCard = (updatedCard: Card) => {
    const updatedCards = cards.map((card) => {
      if (card.id === updatedCard.id) {
        return updatedCard;
      } else {
        return card;
      }
    });
    setCards(updatedCards);
  };

  const handleAddCard = () => {
    const newCard = new Card("", [""]);
    setCards([...cards, newCard]);
  };

  const handleDeleteCard = (cardToDeleteId: string) => {
    const filteredCards = cards.filter((card) => card.id !== cardToDeleteId);
    setCards(filteredCards);
  };

  return (
    <div className="parent-component">
      <h1>Flash Cards</h1>
      <button onClick={handleAddCard}>Add Card</button>
      {cards.map((card) => (
        <div key={card.id.toString()}>
          <FlashCardEditor
            card={card}
            onSave={handleSaveCard}
            onDelete={handleAddCard}
          />
        </div>
      ))}
    </div>
  );
};

export default CardMock;
