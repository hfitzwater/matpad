<template>
  <div id="command-palette" v-if="isOpen">
    <cv-combo-box 
      ref="palette"
      label="Type a command"
      :auto-filter="true"
      :auto-highlight="true"
      :value="selectedCommand"
      :options="commands"
      @change="commandSelected">
    </cv-combo-box>
  </div>
</template>

<script>
  import { UTIL_ACTIONS } from '../../store/modules/Util';

  export default {
    name: 'command-palette',
    methods: {
      commandSelected(cmd) {
        this.$store.dispatch(UTIL_ACTIONS.EXECUTE_COMMAND, cmd);
        this.$store.dispatch(UTIL_ACTIONS.TOGGLE_PALETTE);
      },
      focusCommand() {
        setTimeout(() => {
          this.$refs.palette.$el.querySelector('input').focus();
        });
      }
    },
    data() {
      return {
        selectedCommand: null
      };
    },
    watch: {
      isOpen(open) {
        if(open) {
          this.selectedCommand = null;
          this.focusCommand();
        }
      }
    },
    computed: {
      isOpen() {
        return this.$store.state.Util.isCommandPaletteOpen;
      },
      commands() {
        return this.$store.state.Util.commands.map(cmd => {
          return {
            value: cmd,
            label: cmd,
            name: cmd
          };
        });
      }
    }
  }
</script>

<style scoped>
  #command-palette {
    width: 60%;
    margin: auto;
  }
</style>
