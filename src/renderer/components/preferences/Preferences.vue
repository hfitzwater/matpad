<template>
  <div id="preferences">
    <cv-modal :visible=true @modal-hidden="onHide">
      <template slot="label">Matpad</template>
      <template slot="title">Preferences</template>
      <template slot="content">
        <div>
          <cv-tabs>
            <cv-tab id="symbols-tab" label="Symbols">
              <cv-data-table :columns="symbolsColumns" ref="table">
                <template slot="data">
                  <cv-data-table-row v-for="(row, rowIndex) in symbolsData" :key="`${rowIndex}`" :value="`${rowIndex}`">
                    <cv-data-table-cell v-for="(cell, cellIndex) in row" :key="`${cellIndex}`" :value="`${cellIndex}`" v-html="cell"></cv-data-table-cell>
                  </cv-data-table-row>
                </template>
              </cv-data-table>
            </cv-tab>
            <cv-tab id="examples-tab" label="Examples">
              <cv-data-table :columns="examplesColumns" ref="table">
                <template slot="data">
                  <cv-data-table-row v-for="(row, rowIndex) in examplesData" :key="`${rowIndex}`" :value="`${rowIndex}`">
                    <cv-data-table-cell v-for="(cell, cellIndex) in row" :key="`${cellIndex}`">
                      <div v-if="cellIndex === 0">
                        {{ cell }}
                      </div>
                      <div v-if="cellIndex === 1">
                        <cv-button
                          kind="primary"
                          size="field"
                          @click="showExample(cell)"
                        >
                          Try it!
                        </cv-button>
                      </div>
                    </cv-data-table-cell>
                  </cv-data-table-row>
                </template>
              </cv-data-table>
            </cv-tab>
            <cv-tab id="keys-tab" label="Key Bindings">
              <cv-data-table :columns="keymapColumns" ref="table">
                <template slot="data">
                  <cv-data-table-row v-for="(row, rowIndex) in keymapData" :key="`${rowIndex}`" :value="`${rowIndex}`">
                    <cv-data-table-cell v-for="(cell, cellIndex) in row" :key="`${cellIndex}`" :value="`${cellIndex}`" v-html="cell"></cv-data-table-cell>
                  </cv-data-table-row>
                </template>
              </cv-data-table>
            </cv-tab>
          </cv-tabs>
        </div>
      </template>
      <template slot="primary-button" @click="close">OK</template>
    </cv-modal>
  </div>
</template>

<script>
  import PeristentStore, { USER_DATA } from '../../PersistentStore';
  import PersistentStore from '../../PersistentStore';
  import { KEYWORDS } from '../../processor/processor';
  import { EDITOR_MUTATIONS } from '../../store/modules/Editor';
  import Examples from '../../examples/examples';

  export default {
    name: 'preferences',
    created() {
      this.loadKeymap();
      this.loadSymbols();
      this.loadExamples();
    },
    methods: {
      onHide() {
        this.close();
      },
      showExample(exampleKey) {
        const example = Examples[Object.keys(Examples).find(key => {
          return Examples[key].key === exampleKey;
        })];

        this.$store.commit(EDITOR_MUTATIONS.SET_EDITOR_CONTENTS, example.data);

        this.close();
      },
      loadExamples() {
        this.examplesColumns = [
          'Description',
          ''
        ];

        this.examplesData = Object.keys(Examples).map(key => {
          const example = Examples[key];

          return [
            example.description,
            example.key
          ];
        });
      },
      loadSymbols() {
        this.symbolsColumns = [
          'Symbol',
          'Description'
        ];

        this.symbolsData = KEYWORDS.map(k => {
          return [
            k.symbol,
            k.description
          ];
        });
      },
      loadKeymap() {
        const mappings = PersistentStore.read(USER_DATA.KEYMAP).mappings;
        
        this.keymapColumns = [
          "Keys",
          "Command",
          "Description"
        ];
        
        this.keymapData = mappings.map(m => {
          return [
            m.keys.reduce((acc, k) => {
              if( acc.length ) {
                return `${acc}<br>${k}`;
              } else {
                return `${k}`
              }
            }, ''),
            m.command,
            m.description
          ];
        });
      },
      close() {
        window.location.hash = '/';
      }
    },
    data() {
      return {
        keymapData: [],
        keymapColumns: [],
        symbolsData: [],
        symbolsColumns: [],
        examplesData: [],
        examplesColumns: []
      };
    }
  }
</script>

<style>
  #preferences {
    background-color: #000;
  }

  #preferences .bx--modal-container {
    width: 100% !important;
    max-height: 100% !important;
    height: 100% !important;
  }
</style>
