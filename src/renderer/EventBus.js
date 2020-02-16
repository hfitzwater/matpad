import Vue from 'vue';

export const Bus = new Vue();
export const APP_EVENTS = {
  LOAD_FILE_CONTENTS: 'load-file-contents',
  INSERT_SYMBOL: 'insert-symbol'
};