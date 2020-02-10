<template>
  <div id="app">
    <command-palette></command-palette>
    <router-view></router-view>
  </div>
</template>

<script>
  import CommandPalette from './components/command-palette/CommandPalette';
  import Mousetrap from 'mousetrap';

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
        Mousetrap.bind(['command+p', 'ctrl+p'], () => {
          this.$store.dispatch('togglePalette');
          return true;
        });
      }
    }
  }
</script>

<style>
  /* CSS */
</style>
