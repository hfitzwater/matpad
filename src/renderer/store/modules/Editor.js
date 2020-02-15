const state = {
  editorContents: null
};

export const EDITOR_MUTATIONS = {
  SET_EDITOR_CONTENTS: 'setEditorContents'
};

const mutations = {
  [EDITOR_MUTATIONS.SET_EDITOR_CONTENTS] (state, payload) {
    state.editorContents = payload;
  }
};

export const EDITOR_ACTIONS = {
  UPDATE_EDITOR_CONTENTS: 'updateEditorContents'
};

const actions = {
  [EDITOR_ACTIONS.UPDATE_EDITOR_CONTENTS]({ commit }, payload) {
    commit(EDITOR_MUTATIONS.SET_EDITOR_CONTENTS, payload);
  }
}

export default {
  state,
  mutations,
  actions
};
