import electron from 'electron';
import path from 'path';
import fs from 'fs';
import log from 'electron-log';
import { COMMANDS, UTIL_ACTIONS } from './store/modules/Util';

export const USER_DATA = {
  KEYMAP: {
    file: 'keymap.json',
    defaults: {
      mappings: [
        {
          keys: ['command+p', 'ctrl+p'],
          command: UTIL_ACTIONS.TOGGLE_PALETTE,
          description: 'Open application command palette'
        },
        {
          keys: ['command+o', 'ctrl+o'],
          command: COMMANDS.OPEN_FILE,
          description: 'Open a file in Matpad'
        },
        {
          keys: ['command+s', 'ctrl+s'],
          command: COMMANDS.SAVE_FILE,
          description: 'Save contents of current matpad'
        },
        {
          keys: ['command+q', 'ctrl+q'],
          command: COMMANDS.QUIT,
          description: 'Close the application'
        },
        {
          keys: ['command+,', 'ctrl+,'],
          command: COMMANDS.PREFERENCES,
          description: 'Open application preferences'
        }
      ]
    }
  }
};

const filePath = (key) => {
  return path.join((electron.app || electron.remote.app).getPath('userData'), key);
};

export default class PersistentStore {
  static read(target) {
    const file = filePath(target.file);
    const exists = fs.existsSync(target.file);

    if(!exists) {
      return target.defaults;
    }

    try {
      const data = fs.readFileSync(file);
      return JSON.parse(data);
    } catch(ex) {
      log.error(ex);
    }
  }

  static write(target, data) {
    fs.writeFileSync(filePath(target.file), JSON.stringify(data));
  }

  static restoreDefaults(target) {
    fs.writeFileSync(filePath(target.file), JSON.stringify(target.defaults));
  }
}