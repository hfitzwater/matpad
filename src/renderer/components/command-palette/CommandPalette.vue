<template>
  <div id="command-palette" v-if="isOpen">
    <div class="drop">
      <div style="border-bottom: 1px solid #5c5c5c;">
        <input ref="command" v-model="input" type="text" @keydown="keydown">
      </div>
      <div style="padding: 4px; font-size: 0.8rem; color: #d3d3d3;">
        <div v-for="cmd of commands" :key="cmd">
            {{ cmd }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { UTIL_ACTIONS } from '../../store/modules/Util';
  
  export default {
    name: 'command-palette',
    methods: {
      keydown(evt) {
        if(evt.key === 'Escape') {
          this.$store.dispatch(UTIL_ACTIONS.TOGGLE_PALETTE);
        }

        if(evt.key === 'Enter') {
          this.$store.dispatch(UTIL_ACTIONS.EXECUTE_COMMAND, this.input);
          this.$store.dispatch(UTIL_ACTIONS.TOGGLE_PALETTE);
        }
      },
      focusCommand() {
        setTimeout(() => {
          this.$refs.command.focus();
        });
      }
    },
    data() {
      return {
        input: null
      };
    },
    watch: {
      isOpen(open) {
        if(open) {
          this.input = null;
          this.focusCommand();
        }
      }
    },
    computed: {
      isOpen() {
        return this.$store.state.Util.isCommandPaletteOpen;
      },
      commands() {
        return this.$store.state.Util.commands.filter(c => {
          if( !this.input || this.input === '' ) return true;

          const compare = this.input.toLowerCase();
          c = c.toLowerCase();

          return c.includes(compare);
        });
      }
    }
  }
</script>

<style scoped>
  #command-palette {
    width: 60%;
    margin: auto;
    background: transparent;
    position: absolute;
    z-index: 15;
    top: 0;
    left: 0;
    right: 0;
  }

  #command-palette .drop {
    background-color: #333;
    border: 1px solid #5c5c5c;
    box-sizing: border-box;
  }

  #command-palette .drop input {
    box-sizing: border-box;
    width: 100%;
    background-color: transparent;
    color: #efefef;
    border: none;
    outline: none;
    padding: 0px 4px 4px 4px;
  }
</style>
