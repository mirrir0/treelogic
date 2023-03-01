import React from "react";
import Markdown from "markdown-to-jsx";
import { BlockMath, InlineMath } from "react-katex";
import 'katex/dist/katex.min.css';

interface Props {
  input: string;
}

const RenderText: React.FC<Props> = ({ input }) => {
  const parseCloze = (s: string ) => {
    let t = s;
    const cloze = /\{\{(\w+)\}\}/;
    t= t.replace(cloze, "\\text{$1}")
    console.log(`renderer (cloze) parsed\n${s}\nand got\n${t}`);
    return t
  }
  const parseTex = (s: string) => {
    let t = s;
    const block = /\$\$\n*(.+?)\n*\$\$/g;

    t = t.replace(block, "<blockMath math=\"$1\"/>");
    const inline = /(?<!\$)\$(.+?)\$(?!\$)/g;

    // inlineMatches?.forEach(() => {
    t = t.replace(inline, "<inlineMath math=\"$1\"/>");
    // });


    const slashes = /(?<!\$)(\\)+/g;
    const slashMatches = t.match(slashes);
    slashMatches?.forEach(() => {
      t = t.replace(slashes, "\\")
    })    

    console.log(`renderer (TeX) parsed\n${s}\nand got\n${t}`);
    return t;
  };
  const parseAll = (s: string) => {
    return parseTex(parseCloze(s))
  }
  return (
    <div>
      <Markdown
        options={{
          overrides: {
            inlineMath: {
              component: InlineMath,
            },
            blockMath: {
              component: BlockMath,
            },
          },
        }}
      >
        {parseAll(input)}
      </Markdown>
    </div>
  );
};

export default RenderText;
