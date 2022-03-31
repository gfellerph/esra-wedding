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
          :src="getThumbsPath(image.image)"
          v-for="(image, index) in $page.gallery.images"
          :key="index"
          data-zoomable
          :data-zoom-src="image.image"
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
          title,
          pagename
        }
      }
    }
    gallery:gallery(id:$id) {
      id,
      title,
      pagename,
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
let masonry;

if (process.isClient) {
  Masonry = import('masonry-layout');
  mediumZoom = import('medium-zoom');
}


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
          gallery.href = `/gallery/${gallery.node.pagename.toLowerCase()}`;
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
  beforeRouteUpdate(to, from, next) {
    zoom.detach();
    masonry.destroy();
    next();
  },
  methods: {
    getThumbsPath(imageSrc) {
      const sequence = imageSrc.split('/');
      const filename = sequence.pop();
      return sequence.join('/') + '/thumbs/' + filename;
    },
    async imageLoaded() {
      this.loadedImages++;
      if (this.loadedImages === this.$page.gallery.images.length) {
        if (masonry) masonry.destroy();
        if (zoom) await zoom.close()
        if (zoom) zoom.detach();
        const gallery = document.querySelector(".gallery");
        this.$nextTick(async () => {
          const MasonryLib = await Masonry;
          const mediumZoomLib = await mediumZoom;
          masonry = new MasonryLib.default(gallery, { gutter: 8 });
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
