import React from "react";
// @ts-ignore
import CKEditor from '@ckeditor/ckeditor5-react';
// @ts-ignore
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// @ts-ignore
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
// @ts-ignore
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
// @ts-ignore
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
// @ts-ignore
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
// @ts-ignore
import Code from '@ckeditor/ckeditor5-basic-styles/src/code';
// @ts-ignore
import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript';
// @ts-ignore
import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript';
//
// import FroalaEditorComponent from 'react-froala-wysiwyg';
//
// // Require Plugins Editor JS files.
// import 'froala-editor/js/plugins/align.min.js';
// import 'froala-editor/js/plugins/lists.min.js';
// import 'froala-editor/js/plugins/link.min.js';
// import 'froala-editor/js/plugins/inline_class.min.js';
// import 'froala-editor/js/plugins/inline_style.min.js';
//
//
// // Require Editor JS files.
// import 'froala-editor/js/froala_editor.pkgd.min.js';
//
// // Require Editor CSS files.
// import 'froala-editor/css/froala_style.min.css';
// import 'froala-editor/css/froala_editor.pkgd.min.css';
//
// // Require Font Awesome.
// import 'froala-editor/css/third_party/font_awesome.min.css';

interface IPropTypes {
  editorState: any;
  onChange: (editorState: any) => any;
  classList?: {}
}

// Doc
// https://froala.com/wysiwyg-editor/v2-0/examples/

export const HtmlEditor: React.FC<IPropTypes> = ({editorState, onChange, classList}) => (
  <div className="html-editor-wrapper">
    {/*<FroalaEditorComponent*/}
    {/*  tag='textarea'*/}
    {/*  config={{*/}
    {/*    toolbarButtons: ['bold', 'italic', 'underline', 'alignJustify', 'formatOL', 'formatUL', 'insertLink', '|', 'inlineClass'],*/}
    {/*    inlineClasses: {...classList}*/}
    {/*  }}*/}
    {/*  model={editorState}*/}
    {/*  onModelChange={onChange}*/}
    {/*/>*/}
    <CKEditor

      config={{
        plugins: [ Bold, Italic, Underline, Strikethrough, Code, Subscript, Superscript ],
        toolbar: {
          items: [ 'bold', 'italic', 'underline', 'strikethrough', 'code','subscript', 'superscript'  ]
        }
      }}
      editor={ ClassicEditor }
      data={editorState}
      onInit={ (editor: any) => {
        // You can store the "editor" and use when it is needed.
        console.log( 'Editor is ready to use!', editor );
      } }
      onChange={ ( event: any, editor: any ) => {
        const data = editor.getData();
        console.log( { event, editor, data } );
        onChange(data)
      } }
      onBlur={ ( event: any, editor: any ) => {
        console.log( 'Blur.', editor );
      } }
      onFocus={ ( event: any, editor: any ) => {
        console.log( 'Focus.', editor );
      } }
    />
  </div>
)
