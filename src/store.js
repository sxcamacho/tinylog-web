import Vue from "vue";
import Vuex from "vuex";
import { stat } from "fs";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    file: undefined,
    logs: [],
    creatingFile: false,
    loadingFile: false
  },
  mutations: {
    setFile(state, file) {
      state.file = file;
    },
    setLogs(state, logs) {
      state.logs = logs;
    },
    setCreatingFile(state, value) {
      state.creatingFile = value;
    },
    setLoadingFile(state, value) {
      state.loadingFile = value;
    },
    addLogToList(state, log) {
      state.logs.push(log);
    }
  },
  actions: {
    createFile: context => {
      context.commit("setCreatingFile", true);
      return Vue.axios
        .post(`http://localhost:3000/files`, {
          name: "untitled"
        })
        .then(response => {
          context.commit("setFile", response.data);
          context.commit("setCreatingFile", false);
        })
        .catch(function() {
          context.commit("setFile", undefined);
          context.commit("setCreatingFile", false);
        });
    },
    getFile: (context, params) => {
      context.commit("setLoadingFile", true);
      Promise.all([
        Vue.axios.get(`http://localhost:3000/files/${params.id}`),
        Vue.axios.get(`http://localhost:3000/files/${params.id}/logs`)
      ])
        .then(response => {
          context.commit("setFile", response[0].data);
          context.commit("setLogs", response[1].data);
          context.commit("setLoadingFile", false);
        })
        .catch(function() {
          context.commit("setFile", undefined);
          context.commit("setLogs", []);
          context.commit("setLoadingFile", false);
        });
    },
    addLog(context, log) {
      context.commit("addLogToList", log);
    }
  }
});
