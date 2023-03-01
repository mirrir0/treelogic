import { uuid } from "uuidv4";
import CardMock from "./CardMock";
import "@/app/styles/root.css";

interface ResourceReference {
  id: number;
}

interface Note {
  id: number;
  type: "resource" | "note" | "card";
  contents: string;
}

interface TrunkNode {
  obj: ResourceReference | Note;
  connections: TrunkNode[];
}

interface TrunkProps {
  nodes: TrunkNode[];
}

const RootView: React.FC = () => {
  return (
    <div className="root-view">
      <CardMock />
    </div>
  );
};

export default RootView;
