<template>
  <router-view />
</template>

<static-query>
query {
  meta:netlifyPages(path:"/src/admin/content/meta") {
    title,
    img,
    description
  }
}
</static-query>

<script>
export default {
  metaInfo() {
    return {
      title: this.$static.meta.title,
      meta: [
        {
          key: "description",
          name: "description",
          content: this.$static.meta.description
        },
        {
          key: "og:title",
          name: "og:title",
          content: this.$static.meta.title
        },
        {
          key: "og:description",
          name: "og:description",
          content: this.$static.meta.description
        },
        {
          key: "og:image",
          name: "og:image",
          content: this.$static.meta.img
        }
      ]
    };
  },
  mounted() {
    /* document.body.addEventListener("click", e => {
      const { pageX, pageY } = e;
      const img = document.createElement("img");
      img.src = `/dot${Math.round(Math.random() * 9)}.png`;
      img.classList.add("dot");
      img.style.top = `${pageY}px`;
      img.style.left = `${pageX}px`;
      img.style.zIndex = 100;
      img.style.transform = `translate(-50%, -50%) rotateZ(${Math.random() *
        360}deg)`;
      img.style.transition = "opacity 15s";
      img.style.opacity = "1";
      setTimeout(() => {
        img.style.opacity = "0";
      }, 1);
      img.addEventListener("transitionend", () => {
        img.parentNode.removeChild(img);
      });
      document.body.append(img);
    }); */
  }
};
</script>
