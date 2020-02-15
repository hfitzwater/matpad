<template>
  <div id="app">
    <command-palette></command-palette>
    <router-view></router-view>
  </div>
</template>

<script>
  import CommandPalette from './components/command-palette/CommandPalette';
  import { UTIL_ACTIONS } from './store/modules/Util';
  import Mousetrap from 'mousetrap';
  import 'mousetrap/plugins/global-bind/mousetrap-global-bind';
  import PersistentStore, { USER_DATA } from './PersistentStore';

  export default {
    name: 'matpad',
    components: {
      CommandPalette
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
      }
    }
  }
</script>

<style>
  /* CSS */
</style>
