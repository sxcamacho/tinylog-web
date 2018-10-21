<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <RequestInfo :request="requestToCreate" />
    <button @click="createFile">Create File</button>
  </div>
</template>

<script>
import RequestInfo from "@/components/RequestInfo";

export default {
  name: "home",
  components: {
    RequestInfo
  },
  data() {
    return {
      requestToCreate: {
        verb: "POST",
        url: "http://api.tinylog.io/files/",
        body: {
          name: "some name"
        }
      }
    };
  },
  methods: {
    createFile() {}
  }
};
</script>
