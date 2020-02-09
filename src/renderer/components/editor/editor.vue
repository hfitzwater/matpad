<template>
  <div id="wrapper">
    <main>
      <div class="container">
        <div class="split-left">
          <input type="text" v-model="expression" @change="calculate()" @keyup="calculate()">
          <button @click="calculate()">
            Calculate
          </button>
          <div class="editor">
            <editor-content class="editor__content" :editor="editor" />
          </div>
        </div>
        <div class="split-right">
          Expression: {{ expression }}
          Result: {{ result }}
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  import mexp from 'math-expression-evaluator';
  import { Editor, EditorContent } from 'tiptap';
  import { CodeBlockHighlight } from 'tiptap-extensions';

  export default {
    name: 'editor',
    components: {
      EditorContent
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      calculate(exp) {
        try {
          this.result = mexp.eval(this.expression);
        } catch(ex) {
          console.warn(ex);
        }
      }
    },
    data() {
      return {
        result: null,
        expression: '1',
        editor: new Editor({
          extensions: [
            new CodeBlockHighlight({
              languages: {}
            }),
          ],
          content: `
            <p> Enter some things </p>
            <pre><code>function() {}</code></pre>
            <p> End of stuff </p>
          `
        })
      }
    },
    beforeDestroy() {
      this.editor.destroy()
    }
  }
</script>

<style>
  /* .ProseMirror [contenteditable="false"] {
    white-space: normal;
  }

  .ProseMirror [contenteditable="true"] {
    white-space: pre-wrap;
  } */
</style>