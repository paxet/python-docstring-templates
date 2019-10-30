'use babel';

import { CompositeDisposable } from 'atom';

const TEMPLATE = '"""summary\n\
\n\
Arguments:\n\
  name {type} -- description\n\
\n\
Keyword Arguments:\n\
  name {type} -- description (default: {value})\n\
\n\
Raises:\n\
  type: description\n\
\n\
Returns:\n\
  type -- description\n\
"""'

export default {

  subscriptions: null,

  activate() {
    // Events subscribed to in atom's system can be easily cleaned up
    // with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'python-docstring-templates:insert': () => this.insert()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  insert() {
    const editor = atom.workspace.getActiveTextEditor();
    const indentation = editor.getCursorBufferPosition().column;
    // TODO: Check if file opened is a Python source file
    if (editor) {
      let docstring = '';
      lines = TEMPLATE.split('\n')
      for (var i=0; i < lines.length; i++) {
        if (i > 0 && lines[i] != '') {
            docstring += ' '.repeat(indentation);
        }
        docstring += lines[i];
        docstring += '\n';
      }
      editor.insertText(docstring);
    }
  }

};
