import electron from 'electron';

const MUTATIONS = {
  TOGGLE_COMMAND_PALETTE: 'TOGGLE_COMMAND_PALETTE'
};

const COMMANDS = {
  INSERT_SYMBOL: 'Insert Symbol',
  SAVE: 'Save',
  QUIT: 'Quit'
};

const CommandHandlers = {
  [COMMANDS.INSERT_SYMBOL.toLowerCase()]: () => {
    console.log('insert symbol');
  },
  [COMMANDS.SAVE.toLowerCase()]: () => {
    console.log('save');
  },
  [COMMANDS.QUIT.toLowerCase()]: () => {
    electron.app.exit();
  }
}

const state = {
  isCommandPaletteOpen: false,
  commands: [
    COMMANDS.INSERT_SYMBOL,
    COMMANDS.SAVE,
    COMMANDS.QUIT
  ]
};

const mutations = {
  [MUTATIONS.TOGGLE_COMMAND_PALETTE] (state) {
    state.isCommandPaletteOpen = !state.isCommandPaletteOpen;
  }
};

const actions = {
  togglePalette({ commit }) {
    commit(MUTATIONS.TOGGLE_COMMAND_PALETTE);
  },
  executeCommand({ commit }, cmd) {
    const command = CommandHandlers[cmd.toLowerCase()];

    if(command) {
      command();
    }
  }
};

export default {
  state,
  mutations,
  actions
};
