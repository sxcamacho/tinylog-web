<template>
    <div>
      <h1 v-if="file">{{file.name}}</h1>
      
      <request-info :request="requestToCreateLog" />
      
      <!-- <div v-if="logs" v-for="log in logs" :key="log.id"><span>{{log.type}}: {{log.text}}</span></div> -->

      <div v-show="!logs"><span>This file is empty</span></div>

      <v-timeline dense v-show="logs" class="logs-box">
        <v-slide-x-reverse-transition
          group
          hide-on-leave
        >
          <v-timeline-item
            v-for="log in logs"
            :key="log.id"
            :color="getLogColor(log.type)"
            small
            fill-dot
          >
            <v-alert
              :value="true"
              color="blue"
              :icon="getLogIcon(log.type)"
            >
              {{log.text}}
            </v-alert>
          </v-timeline-item>
        </v-slide-x-reverse-transition>
      </v-timeline>

    </div>
</template>

<script>
import RequestInfo from "@/components/RequestInfo";
import store from "../store";

const COLORS = ["info", "warning", "error", "success"];
const ICONS = {
  info: "mdi-information",
  warning: "mdi-alert",
  error: "mdi-alert-circle",
  success: "mdi-check-circle"
};

export default {
  name: "file",
  components: {
    "request-info": RequestInfo
  },
  data() {
    return {
      fileId: undefined
    };
  },
  filters: {},
  computed: {
    file() {
      return store.state.file;
    },
    logs() {
      return store.state.logs;
    },
    requestToCreateLog() {
      let id = this.file ? this.file.id : "x";
      return {
        method: "POST",
        url: `http://api.tinylog.io/files/${id}/logs`,
        body: {
          type: "info",
          text: "some message"
        }
      };
    }
  },
  methods: {
    loadFile(fileId) {
      store.dispatch("getFile", { id: fileId });
    },
    getLogColor(value) {
      let icon = ICONS.success;
      switch (value.toUpperCase()) {
        case "TINY_LOG_INFO":
          icon = ICONS.info;
          break;
        case "TINY_LOG_WARNING":
          icon = ICONS.warning;
          break;
        case "TINY_LOG_ERROR":
          icon = ICONS.error;
          break;
      }
      return icon;
    },
    getLogIcon(value) {
      let color = "gray";
      switch (value.toUpperCase()) {
        case "TINY_LOG_INFO":
          color = "info";
          break;
        case "TINY_LOG_WARNING":
          color = "warning";
          break;
        case "TINY_LOG_ERROR":
          color = "error";
          break;
      }

      return color;
    }
  },
  beforeMount() {
    this.fileId = this.$route.params.id;
  },
  mounted() {
    this.loadFile(this.fileId);

    let channel = this.$pusher.subscribe(this.fileId);
    channel.bind("log", function(log) {
      store.dispatch("addLog", log);
    });
  },
  beforeUnmount() {
    this.$pusher.unsubscribe(this.fileId);
  }
};
</script>

<style>
.logs-box {
  max-width: 600px;
  margin: 0 auto;
}
</style>
