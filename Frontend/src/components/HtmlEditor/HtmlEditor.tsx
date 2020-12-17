import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface IPropTypes {
  editorState: any;
  onChange: (editorState: any) => any;
  classList?: {};
}

// Doc
// https://github.com/zenoamaro/react-quill

export class HtmlEditor extends React.PureComponent<IPropTypes> {
  static modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
    ],
  };

  constructor(props: IPropTypes) {
    super(props);
  }

  render() {
    return (
      <div className="html-editor-wrapper">
        <ReactQuill
          theme="snow"
          modules={HtmlEditor.modules}
          value={this.props.editorState}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}
