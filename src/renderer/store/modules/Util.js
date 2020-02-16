import electron from 'electron';
import os from 'os';
import log from 'electron-log';
import fs from 'fs';
import { Bus, APP_EVENTS }  from '../../EventBus';

export const COMMANDS = {
  INSERT_SYMBOL: 'Insert Symbol',
  SAVE_FILE: 'Save',
  OPEN_FILE: 'Open',
  QUIT: 'Quit',
  PREFERENCES: 'Edit Preferences'
};

const CommandHandlers = {
  [COMMANDS.INSERT_SYMBOL.toLowerCase()]: (rootState, commit, dispatch) => {
    dispatch(UTIL_ACTIONS.TOGGLE_SYMBOLS, null, { root: true});
  },
  [COMMANDS.SAVE_FILE.toLowerCase()]: async (rootState) => {
    const filePath = await electron.remote.dialog.showSaveDialog(null, {
      title: 'Save',
      defaultPath: os.homedir()
    });

    if(filePath) {
      fs.writeFileSync(filePath, rootState.Editor.editorContents);
    }
  },
  [COMMANDS.OPEN_FILE.toLowerCase()]: async (rootState) => {
    const filePaths = await electron.remote.dialog.showOpenDialog(null, {
      title: 'Open',
      defaultPath: os.homedir()
    });

    if(filePaths && filePaths.length >= 1) {
      const data = fs.readFileSync(filePaths[0]);
      Bus.$emit(APP_EVENTS.LOAD_FILE_CONTENTS, data.toString());
    }
  },
  [COMMANDS.QUIT.toLowerCase()]: (rootState) => {
    electron.app.exit();
  },
  [COMMANDS.PREFERENCES.toLowerCase()]: (rootState) => {
    const baseUri = window.location.href.split('#')[0];
    window.location.href = `${baseUri}#/preferences`
  }
};

const state = {
  isCommandPaletteOpen: false,
  isInsertSymbolOpen: false,
  commands: Object.values(COMMANDS)
};

export const UTIL_MUTATIONS = {
  TOGGLE_COMMAND_PALETTE: 'TOGGLE_COMMAND_PALETTE',
  TOGGLE_SYMBOL_INSERT: 'TOGGLE_SYMBOL_INSERT'
};

const mutations = {
  [UTIL_MUTATIONS.TOGGLE_COMMAND_PALETTE] (state) {
    state.isCommandPaletteOpen = !state.isCommandPaletteOpen;
  },
  [UTIL_MUTATIONS.TOGGLE_SYMBOL_INSERT] (state) {
    state.isInsertSymbolOpen = !state.isInsertSymbolOpen;
  }
};

export const UTIL_ACTIONS = {
  TOGGLE_PALETTE: 'togglePalette',
  TOGGLE_SYMBOLS: 'toggleSymbols',
  EXECUTE_COMMAND: 'executeCommand'
};

const actions = {
  [UTIL_ACTIONS.TOGGLE_PALETTE]({ commit }) {
    commit(UTIL_MUTATIONS.TOGGLE_COMMAND_PALETTE);
  },
  [UTIL_ACTIONS.TOGGLE_SYMBOLS]({ commit }) {
    commit(UTIL_MUTATIONS.TOGGLE_SYMBOL_INSERT);
  },
  [UTIL_ACTIONS.EXECUTE_COMMAND]({ commit, state, rootState, dispatch }, cmd) {
    if( cmd === UTIL_ACTIONS.TOGGLE_PALETTE ) {
      commit(UTIL_MUTATIONS.TOGGLE_COMMAND_PALETTE);
      return;
    }

    const command = CommandHandlers[cmd.toLowerCase()];

    if(command) {
      command(rootState, commit, dispatch);
    }
  }
};

export default {
  state,
  mutations,
  actions
};
