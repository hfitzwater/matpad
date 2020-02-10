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
  import 'codemirror/addon/search/search';
  import 'codemirror/addon/search/searchcursor';
  import 'codemirror/addon/search/jump-to-line';
  import 'codemirror/addon/dialog/dialog';
  import js from 'codemirror/mode/javascript/javascript';

  import 'codemirror/lib/codemirror.css';
  import 'codemirror/addon/dialog/dialog.css';

  import Processor from '../../processor/processor';

  let editorModel = {
    text: '',
    stats: {
      words: 0,
      chars: 0
    }
  };

  let outputModel = {
    text: '',
    stats: {
      words: 0,
      chars: 0
    }
  };

  export default {
    name: 'editor',
    methods: {
      update() {
        const result = Processor.parseEditor(this.editorModel.text);
        this.output.getDoc().setValue(result);
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
          lineWrapping: true,
          theme: '3024-night',
          lineNumbers: true
        });

        this.editor.on('change', cm => {
          this.editorModel.text = cm.getValue();
          this.update();
        });
      }
    },
    mounted() {
      this.initMainEditor();
      this.initOuputEditor();
    },
    data() {
      return {
        editorModel: editorModel,
        outputModel: outputModel,
        editor: null,
        output: null
      }
    },
    beforeDestroy() {
      this.editor.destroy()
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
    overflow-y: scroll;
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
</style>