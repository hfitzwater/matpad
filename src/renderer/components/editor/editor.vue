<template>
  <div id="wrapper">
    <main>
      <div class="container">
        <div class="left">
          <div id="editor">
          </div>
        </div>
        <div class="right">
          <div id="output">
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  import CodeMirror from 'codemirror/lib/codemirror.js';
  import 'codemirror/theme/material';
  import 'codemirror/theme/darcula';
  import 'codemirror/theme/3024-night';
  import 'codemirror/addon/hint/anyword-hint';
  import 'codemirror/addon/hint/show-hint';
  import 'codemirror/addon/hint/show-hint.css';
  import 'codemirror/addon/search/search';
  import 'codemirror/addon/search/searchcursor';
  import 'codemirror/addon/search/jump-to-line';
  import 'codemirror/addon/dialog/dialog';
  import js from 'codemirror/mode/javascript/javascript';

  import 'codemirror/lib/codemirror.css';
  import 'codemirror/addon/dialog/dialog.css';

  import Processor from '../../processor/processor';
  import { Bus, APP_EVENTS } from '../../EventBus';
  import { UTIL_ACTIONS } from '../../store/modules/Util';
  import { EDITOR_ACTIONS } from '../../store/modules/Editor';
  import log from 'electron-log';

  export default {
    name: 'editor',
    methods: {
      update(text) {
        const result = Processor.parseEditor(text);

        this.variables = result.variables;
        this.output.getDoc().setValue(result.value);

        this.$store.dispatch(EDITOR_ACTIONS.UPDATE_EDITOR_CONTENTS, this.editor.getValue());
      },
      initOuputEditor() {
        this.output = CodeMirror(document.getElementById('output'), {
          lineNumbers: false,
          readOnly: true,
          theme: 'material'
        });
      },
      initMainEditor() {
        this.editor = CodeMirror(document.getElementById('editor'), {
          mode: 'javascript',
          lineWrapping: false,
          theme: '3024-night',
          autofocus: true,
          lineNumbers: true
        });

        this.editor.on("keydown", (cm, event) => {
          // alpha, no ctrl, no meta
          if (!(event.ctrlKey) && !(event.metaKey) && (event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122)) {
            CodeMirror.commands.autocomplete(cm, null, {completeSingle: false});
          }

          if (event.key === '@') {
            cm.showHint({
              completeSingle: false,
              hint: (cm, options) => {
                const cursor = cm.getCursor();
                const token = cm.getTokenAt(cursor);
                return {
                    list: Object.keys(this.variables),
                    from: CodeMirror.Pos(cursor.line, token.start),
                    to: CodeMirror.Pos(cursor.line, token.end)
                };
              }
            });
          }
        });

        this.editor.on('change', cm => {
          const text = cm.getValue();
          this.update(text);
        });
      },
      initAppEvents() {
        Bus.$on(APP_EVENTS.LOAD_FILE_CONTENTS, (data) => {
          this.editor.getDoc().setValue(data);
        });

        Bus.$on(APP_EVENTS.INSERT_SYMBOL, (symbol) => {
          const selection = this.editor.getSelection();

          if(selection.length) {
            this.editor.replaceSelection(symbol);
          } else {
            const doc = this.editor.getDoc();
            const cursor = doc.getCursor();
            doc.replaceRange(symbol, cursor);
          }

          this.editor.focus();
        });
      },
      seed() {
        // seed from store
        this.editor.getDoc().setValue(this.$store.state.Editor.editorContents || '');
      }
    },
    mounted() {
      this.initMainEditor();
      this.initOuputEditor();
      this.seed();
    },
    created() {
      this.initAppEvents();
    },
    data() {
      return {
        variables: [],
        editor: null,
        output: null
      }
    }
  }
</script>

<style>
  html, body {
    padding: 0px;
    margin: 0px;
  }

  html, body, #app, #wrapper, #editor, #output, main, .container, .CodeMirror {
    height: 100%;
    max-height: 100%;
  }

  .container {
    display: flex;
  }

  .container .left {
    flex: 1 1 auto;
    width: 60%
  }

  .container .right {
    flex: 0 1 auto;
    width: 40%;
  }

  .CodeMirror {
    font-size: 1.25rem;
  }
</style>