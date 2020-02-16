<template>
  <div id="insert-symbol" v-if="isOpen">
    <cv-combo-box 
      ref="insert"
      label="Choose a symbol"
      :auto-filter="true"
      :auto-highlight="true"
      :value="selectedSymbol"
      :options="symbols"
      @change="symbolSelected">
    </cv-combo-box>
  </div>
</template>

<script>
  import { UTIL_ACTIONS } from '../../store/modules/Util';
  import { KEYWORDS } from '../../processor/processor';
  import { Bus, APP_EVENTS } from '../../EventBus';

  export default {
    name: 'insert-symbol',
    methods: {
      symbolSelected(symbol) {
        Bus.$emit(APP_EVENTS.INSERT_SYMBOL, symbol);
        this.$store.dispatch(UTIL_ACTIONS.TOGGLE_SYMBOLS);
      },
      focusInsert() {
        setTimeout(() => {
          this.$refs.insert.$el.querySelector('input').focus();
        });
      }
    },
    data() {
      return {
        selectedSymbol: null
      };
    },
    watch: {
      isOpen(open) {
        if(open) {
          this.selectedSymbol = null;
          this.focusInsert();
        }
      }
    },
    computed: {
      isOpen() {
        return this.$store.state.Util.isInsertSymbolOpen;
      },
      symbols() {
        return KEYWORDS.map(kw => {
          return {
            value: kw.symbol,
            label: kw.symbol,
            name: kw.description
          };
        });
      }
    }
  }
</script>

<style scoped>
  #insert-symbol {
    width: 60%;
    margin: auto;
  }
</style>
