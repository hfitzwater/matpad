<template>
  <div id="app">
    <command-palette></command-palette>
    <insert-symbol></insert-symbol>
    <router-view></router-view>
  </div>
</template>

<script>
  import CommandPalette from './components/command-palette/CommandPalette';
  import InsertSymbol from './components/insert-symbol/InsertSymbol';
  import { UTIL_ACTIONS } from './store/modules/Util';
  import Mousetrap from 'mousetrap';
  import 'mousetrap/plugins/global-bind/mousetrap-global-bind';
  import PersistentStore, { USER_DATA } from './PersistentStore';

  export default {
    name: 'matpad',
    components: {
      CommandPalette,
      InsertSymbol
    },
    created() {
      this.bindKeys();
    },
    methods: {
      bindKeys() {
        const keymap = PersistentStore.read(USER_DATA.KEYMAP);
        keymap.mappings.forEach(mapping => {
          Mousetrap.bindGlobal(mapping.keys, () => {
            this.$store.dispatch(UTIL_ACTIONS.EXECUTE_COMMAND, mapping.command);
          });
        });

        Mousetrap.bindGlobal(['esc'], () => {
          if( this.$store.state.Util.isCommandPaletteOpen ) {
            this.$store.dispatch(UTIL_ACTIONS.TOGGLE_PALETTE);
          }
        });
      }
    }
  }
</script>

<style>
  /* CSS */
</style>
