import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import EMode from "@/modules/EMode";

function createStore(isClient) {
  const settings = {
    state: {
      mode: "",
      rsvpSent: false,
    },
    mutations: {
      setMode(state, mode) {
        state.mode = mode;
      },
      sendRsvp(state, rsvpSent) {
        state.rsvpSent = rsvpSent;
      },
    },
    getters: {
      getGalleryLinks: (state) => (edges) => {
        const galleries = edges.filter((gallery) => {
          if (gallery.node.visible_apero && state.mode === EMode.Apero)
            return true;
          if (gallery.node.visible_fest && state.mode === EMode.Fest)
            return true;
          return false;
        });
        console.log(galleries);
        return galleries;
      },
    },
    plugins: [],
  };

  if (isClient) {
    const persist = new VuexPersist({
      key: "esra",
      storage: window.localStorage,
    });
    settings.plugins.push(persist.plugin);
  }

  return new Vuex.Store(settings);
}

export default createStore;
