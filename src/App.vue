<template>
  <v-app id="inspire">
    <v-navigation-drawer
        v-model="drawer"
        app
        :mobile-breakpoint="768"
    >
      <v-img
          class="pa-4 pt-6"
          src="mountains.jpg"
          :height="$route.path === '/' ? '240' : '170'"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
      >
        <v-avatar size="70" class="mb-2">
          <img
              src="https://1.gravatar.com/avatar/ac3c3581a6208176131ca1a28c0dc0c0a830b642ed80c812b1000af97a0e4214?s=400"
              alt="Gor Saroyan"
          />
        </v-avatar>

        <p class="white--text text-subtitle-1 mb-0 font-weight-bold">
          Gor Saroyan
        </p>
        <p class="white--text text-subtitle-2 mb-0">
          @DocThor69
        </p>
      </v-img>

      <v-list
          dense
          nav
      >
        <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            :to="item.to"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
        app
        color="primary"
        dark
        src="mountains.jpg"
        prominent
        :height="$route.path === '/' ? '240' : '170'"
    >
      <template v-slot:img="{ props }">
        <v-img
            v-bind="props"
            gradient="to top right, rgba(19,84,122,.9), rgba(128,208,199,.9)"
        ></v-img>
      </template>

      <v-container class="header-container px-0">
        <v-row>
          <v-app-bar-nav-icon @click="drawer = !drawer" />
          <v-spacer />
          <search />
        </v-row>

        <v-row>
          <v-app-bar-title class="ml-4 text-h4 app-title">
            {{ $store.state.appTitle }}
          </v-app-bar-title>
        </v-row>

        <v-row>
          <live-date-time />
        </v-row>

        <v-row v-if="$route.path === '/'">
          <field-add-task />
        </v-row>
      </v-container>

    </v-app-bar>

    <v-main>
      <router-view />
      <snackbar />
    </v-main>
  </v-app>
</template>

<script>
import Snackbar from "@/components/Shared/Snackbar.vue";
import Search from "@/components/Tools/Search.vue";
import LiveDateTime from "@/components/Tools/LiveDateTime.vue";
import FieldAddTask from "@/components/Todo/FieldAddTask.vue";

export default {
  components: {
    FieldAddTask,
    LiveDateTime,
    Snackbar,
    Search,
  },
  data: () => ({
    drawer: null,
    items: [
      { title: 'Todo', icon: 'mdi-format-list-checks', to: "/" },
      { title: 'About', icon: 'mdi-help-box', to: "/about" },
    ],
  }),
  mounted() {
    this.$store.dispatch('getTasks')
  },
}
</script>

<style lang="scss">
.header-container {
  max-width: none !important;
}
.app-title {
  .v-app-bar-title__content {
    width: auto !important;
  }
}
</style>
