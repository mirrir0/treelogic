import { useState } from "react";
import RenderText from "./TextRender";

import Card from "@/util/models/card";

import "@/app/styles/card.css";
import { isFloat32Array } from "util/types";

interface Props {
  card: Card;
  onSave: (updatedCard: Card) => void;
  onDelete: (cardIdToDelete: string) => void;
}

const FlashCardEditor: React.FC<Props> = ({ card, onSave, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isFlipped, setFlipped] = useState(false);
  const [isCloze, setIsCloze] = useState(card.cloze ?? false);
  const [front, setFront] = useState(card.front ?? "");
  const [back, setBack] = useState(card.back ?? "");

  const flipCard = () => {
    if (!isEditing) {
      setFlipped(true);
    }
  };
  const handleSave = () => {
    const updatedCard = new Card(
      card.id,
      card.users,
      front,
      back,
      card.references,
      card.cloze
    );
    onSave(updatedCard);
    setFlipped(false);
    setIsEditing(false);
  };

  const handleDeleteCard = () => {
    const cardIdToDelete = card.id.toString();
    onDelete(cardIdToDelete);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleFrontChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updated = event.target.value;
    setFront(updated);

    const cloze = /\{\{\s\}\}/;
    updated.match(cloze) ? setIsCloze(true) : setIsCloze(false);
  };

  const handleBackChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updated = event.target.value;
    setBack(updated);
  };

  const checkCloze = (markdown: string): string => {
    // hide the cloze if the card has not been flipped
    const cloze = /\{\{(\w+)\}\}/;
    let out = markdown;
    if (isCloze && !isFlipped) {
      out = markdown.replace(cloze, "...");
    }
    if (isCloze && isFlipped) {
      out = markdown.replace(cloze, "$1");
    }
    console.log(`cloze checked string ${out}`);
    return out;
  };

  return (
    <div className="flashcard" onClick={flipCard}>
      {/* front of the card when it has not been flipped */}
      {!isEditing && !isFlipped && (
        <div className="flashcard-body">
          <div className="flashcard-front">
            <RenderText input={checkCloze(front)}></RenderText>
          </div>
          <hr className="dotted" />
        </div>
      )}
      {/* front and back of the card when it has been flipped */}
      {!isEditing && isFlipped && (
        <div className="flashcard-body">
          <div className="flashcard-front">
            <RenderText input={checkCloze(front)}></RenderText>
          </div>
          <hr className="dotted" />
          <div className="flashcard-back">
            <RenderText input={back}></RenderText>
          </div>
        </div>
      )}
      {/* editing view */}
      {isEditing && (
        <div className="flashcard-form">
          <label>
            Front:
            <textarea value={front} onChange={handleFrontChange} />
          </label>
          <hr className="dotted" />
          <label>
            Back:
            <textarea value={back} onChange={handleBackChange} />
          </label>
          <div className="button-group">
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}
      {!isEditing && (
        <div className="button-group">
          <button onClick={handleEdit}>Edit</button>
          <button onClick={() => handleDeleteCard()}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default FlashCardEditor;
