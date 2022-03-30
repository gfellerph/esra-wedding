<template>
  <layout>
    <ClientOnly>
      
    <section class="gallery-container">
      <aside>
        <nav class="gallery-nav">
          <g-link
            v-for="(gallery, index) in galleries"
            :key="index"
            :to="gallery.href"
            >{{ gallery.node.title }}</g-link
          >
        </nav>
      </aside>
      <div class="gallery" :class="{ loaded }">
        <g-image
          :src="image.image"
          v-for="(image, index) in $page.gallery.images"
          :key="index"
          data-zoomable
          @load="imageLoaded()"
        ></g-image>
      </div>
    </section>
    </ClientOnly>
  </layout>
</template>

<page-query>
  query Page ($id:ID!) {
    galleries:allGallery {
      edges {
        node {
          visible_fest,
          visible_apero,
          title
        }
      }
    }
    gallery:gallery(id:$id) {
      id,
      title,
      visible_fest,
      visible_apero,
      images {
        image
      }
    }
  }
</page-query>

<script>

let Masonry;
let mediumZoom;
let zoom;

Masonry = import('masonry-layout');
mediumZoom = import('medium-zoom');


export default {
  data() {
    return {
      loadedImages: 0,
      loaded: false
    };
  },
  computed: {
    galleries() {
      return this.$store.getters
        .getGalleryLinks(this.$page.galleries.edges)
        .map(gallery => {
          gallery.href = `/gallery/${gallery.node.title.toLowerCase()}`;
          return gallery;
        });
    }
  },
  updated() {
    this.loadedImages = 0;
    [...document.querySelectorAll("[data-zoomable]")].map(img => {
      if (img.complete) this.imageLoaded();
    });
  },
  methods: {
    imageLoaded() {
      this.loadedImages++;
      if (this.loadedImages >= this.$page.gallery.images.length) {
        const gallery = document.querySelector(".gallery");
        this.$nextTick(async () => {
          const MasonryLib = await Masonry;
          const mediumZoomLib = await mediumZoom;
          new MasonryLib.default(gallery, { gutter: 8 });
          zoom = mediumZoomLib.default("[data-zoomable]");
          this.loaded = true;
        });
      }
    }
  }
};
</script>

<style lang="scss">
@import "~/styles/mediaqueries.scss";

.gallery-container {
  max-width: 60rem;
  width: 100%;
  padding: 2rem;
  margin-right: auto;
  margin-left: auto;

  @include min($xs) {
    display: flex;
  }
}

.gallery {
  flex-grow: 1;

  img {
    width: calc(50% - 4px);
    margin-bottom: 8px;
    opacity: 0;
    will-change: opacity;
  }

  &.loaded img {
    transition: opacity 1.5s, transform 0.3s cubic-bezier(0.2, 0, 0.2, 1) !important;
    opacity: 1;

    @for $i from 0 to 20 {
      &:nth-child(#{$i}) {
        transition-delay: 0.05s * $i !important;
      }
    }
  }
}

.gallery-nav {
  @include min($xs) {
    margin-right: 4rem;
  }

  @include max($xs) {
    display: flex;
    justify-content: center;
  }

  a {
    text-decoration: none;

    @include min($xs) {
      display: block;
      margin: 1em auto;
    }

    @include max($xs) {
      margin: 1em;
    }

    &.active {
      text-decoration: underline;
    }
  }
}
</style>
