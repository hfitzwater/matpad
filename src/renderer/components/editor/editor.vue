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
  import 'codemirror/lib/codemirror.css';
  import js from 'codemirror/mode/javascript/javascript';
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
        this.result = Processor.parseEditor(this.editorModel.text);
        this.output.getDoc().setValue(this.result);
      }
    },
    mounted() {
      this.output = CodeMirror(document.getElementById('output'), {
        lineNumbers: false,
        readOnly: true,
        theme: 'material'
      });

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
    },
    data() {
      return {
        result: null,
        expression: '1',
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
  html {
    zoom: 150%;
  }

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