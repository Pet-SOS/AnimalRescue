import React from "react";
// @ts-ignore
import FroalaEditorComponent from 'react-froala-wysiwyg';

// Require Plugins Editor JS files.
import 'froala-editor/js/plugins/align.min.js';
import 'froala-editor/js/plugins/lists.min.js';
import 'froala-editor/js/plugins/link.min.js';
import 'froala-editor/js/plugins/inline_class.min.js';
import 'froala-editor/js/plugins/inline_style.min.js';


// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

// Require Font Awesome.
import 'froala-editor/css/third_party/font_awesome.min.css';

interface IPropTypes {
  editorState: any;
  onChange: (editorState: any) => any;
}

// Doc
// https://froala.com/wysiwyg-editor/docs

export const HtmlEditor: React.FC<IPropTypes> = ({editorState, onChange}) => (
  <div className="html-editor-wrapper">
    <FroalaEditorComponent
      tag='textarea'
      config={{
        toolbarButtons: ['bold', 'italic', 'underline', 'alignJustify', 'formatOL', 'formatUL', 'insertLink', '|', 'inlineClass','inlineStyle'],
        inlineStyles: {
          'Big Red': 'font-size: 20px; color: red;',
          'Small Blue': 'font-size: 14px; color: blue;'
        },
        inlineClasses: {
          'fr-class-code': 'Code',
          'fr-class-highlighted': 'Highlighted',
          'fr-class-transparency': 'Transparent'
        }
      }}
      model={editorState}
      onModelChange={onChange}
    />
  </div>
)
