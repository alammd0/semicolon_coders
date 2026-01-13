
import edjsHTML from "editorjs-html";

const edjsParser = edjsHTML();

export function renderEditorJsData(data: any) {
  const html = edjsParser.parse(data);
  return html;
}