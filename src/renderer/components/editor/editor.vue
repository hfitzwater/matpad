<template>
  <div id="wrapper">
    <main>
      <div class="container">
        <div class="left">
          <textarea id="editor">
          </textarea>
        </div>
        <div class="right">
          <textarea id="output">
          </textarea>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  import CodeMirror from 'codemirror';
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
        this.result = Processor.parseEditor(this.editorModel.text, this.variables).map(part => {
          if(part.variable) {
            this.variables[part.variable] = part.number;
          }

          return part.number;
        }).join('\n');
        this.output.getDoc().setValue(this.result);
        console.log(this.variables);
      }
    },
    created() {
      setTimeout(() => {
        this.output = CodeMirror.fromTextArea(document.getElementById('output'), {
          lineNumbers: true,
          readOnly: true
        });

        this.editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
          lineNumbers: true
        });

        this.editor.on('change', cm => {
          this.editorModel.text = cm.getValue();
          this.update();
        });
      });
    },
    data() {
      return {
        variables: {},
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
  * {
    font-family: 'Courier New', Courier, monospace;
    font-size: 14px;
  }

  html, body {
    padding: 0px;
    margin: 0px;
  }
  html, body, #app, #wrapper, main, .container, .CodeMirror {
    height: 100%;
  }

  .container {
    display: flex;
  }

  .container .left, .container .right {
    flex: 1 1 auto;
  }

  .right .CodeMirror {
    background-color: #efefef;
  }
</style>