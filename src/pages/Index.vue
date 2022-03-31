<template>
  <layout>
    <login v-show="!mode" />
    <rsvp v-show="mode" />
    <program v-show="mode" />
    <!-- <map-component v-show="mode" /> -->
  </layout>
</template>

<script>
import Login from "@/components/Login";
import Rsvp from "@/components/Rsvp";
import Program from "@/components/Program";
import MapComponent from "@/components/Map";
import { mapState } from "vuex";

export default {
  name: "Index",
  components: {
    Login,
    Rsvp,
    Program,
    MapComponent
  },
  computed: {
    ...mapState(["mode"])
  }
};
</script>
