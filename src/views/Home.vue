<template>
  <div class="home">
    <request-info :request="requestToCreateFile" />
    <v-btn outline color="indigo" @click="createFile">Get Started</v-btn>
    <span v-show="creatingFile">creating...</span>
  </div>
</template>

<script>
import RequestInfo from "@/components/RequestInfo";
import store from "../store";

export default {
  name: "home",
  components: {
    "request-info": RequestInfo
  },
  computed: {
    creatingFile() {
      return store.state.creatingFile;
    },
    file() {
      return store.state.file;
    }
  },
  data() {
    return {
      requestToCreateFile: {
        method: "POST",
        url: "http://api.tinylog.io/files/",
        body: {
          name: "myFileName.log"
        }
      }
    };
  },
  methods: {
    createFile() {
      let self = this;
      store.dispatch("createFile").then(function() {
        self.$router.push({ name: "file", params: { id: self.file.id } });
      });
    }
  }
};
</script>
