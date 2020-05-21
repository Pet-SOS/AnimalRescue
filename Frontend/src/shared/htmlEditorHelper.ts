import {convertToRaw, EditorState, ContentState} from "draft-js";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

// Parse the EditorState to html string
export function draftToHtmlHelper(editorState: EditorState) {
  return draftToHtml(convertToRaw(editorState.getCurrentContent()))
}

// Create the object of EditorState from html string
export function htmlToDraftHelper(htmlContent: string) {
  const contentBlock = htmlToDraft(htmlContent);
  let editorState: EditorState;
  if (contentBlock) {
    // @ts-ignore
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    editorState = EditorState.createWithContent(contentState);
  }
  // @ts-ignore
  return editorState;
}
