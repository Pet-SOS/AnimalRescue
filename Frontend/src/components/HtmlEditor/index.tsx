import React from "react";
import {EditorState} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "./HtmlEditor.scss";
import {draftToHtmlHelper} from "../../shared/htmlEditorHelper";

interface IPropTypes {
  editorState: any;
  onChange: (editorState: EditorState) => any;
}

// Docu
// https://jpuri.github.io/react-draft-wysiwyg/#/docs?_k=jjqinp
// https://draftjs.org/docs/v0-10-api-migration

export const HtmlEditor: React.FC<IPropTypes> = ({editorState, onChange}: IPropTypes) => (
  <div>
    <div className="html-editor-wrapper">
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={onChange}
      />
    </div>
    <br/>
    <div className="html-preview" dangerouslySetInnerHTML={{__html: draftToHtmlHelper(editorState)}} />
  </div>
)
