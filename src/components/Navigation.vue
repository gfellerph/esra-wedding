<template>
  <nav class="navigation container">
    <!-- <g-link to="/#section-rsvp">Anmeldung</g-link> -->
    <g-link to="/#section-program">Programm</g-link>
    <!-- <g-link to="/#section-map">Anfahrt</g-link> -->
    <g-link
      v-show="$store.getters.getGalleryLinks($static.galleries.edges).length > 0"
      :to="getFirstGalleryLink"
    >Bilder</g-link>
  </nav>
</template>

<static-query>
query {
  galleries:allGallery {
    edges {
      node {
        visible_fest,
        visible_apero,
        title,
        pagename
      }
    }
  }
}
</static-query>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["mode"]),
    getFirstGalleryLink() {
      const gl = this.$store.getters.getGalleryLinks(
        this.$static.galleries.edges
      );
      if (gl.length === 0) return null;
      return `/gallery/${gl[0].node.pagename.toLowerCase()}`;
    }
  }
};
</script>

<style lang="scss">
@import "~/styles/mediaqueries.scss";
.navigation {
  width: 100%;
  display: flex;
  justify-content: space-evenly;

  a {
    font-weight: 700;
    transition: color 0.2s;
    &:hover {
      color: dodgerblue;
    }
    &:not(.active) {
      text-decoration: none;
    }
  }

  @include min($xs) {
    margin: 1em auto;
  }

  @include max($xs) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.95);
    z-index: 1;

    align-items: center;
    flex-direction: column;
    justify-content: center;

    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s, visibility 0s 0.3s;

    .navigation-open & {
      opacity: 1;
      visibility: visible;
      transition: opacity 0.3s, visibility 0s 0s;
    }

    a {
      margin: 1em auto;
      font-size: 1.5em;
    }
  }
}
</style>
