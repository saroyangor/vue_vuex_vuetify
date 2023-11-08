<template>
  <v-text-field
      :value="$store.state.search"
      @input="$store.commit('setSearch', $event)"
      class="expanding-search mt-1"
      :class="{ 'closed': searchClosed && !$store.state.search }"
      placeholder="Search"
      :disabled="$store.state.sorting"
      prepend-inner-icon="mdi-magnify"
      filled
      dense
      clearable
      @focus="searchClosed = false"
      @blur="searchClosed = true"
  />
</template>

<script>
export default {
  data: () => ({
    searchClosed: true,
  }),
}
</script>

<style lang="scss">
.expanding-search {
  transition: max-width 0.3s;

  .v-input__slot {
    cursor: pointer !important;

    &::before, &::after {
      border-color: transparent !important;
    }
  }

  &.closed {
    max-width: 45px;

    .v-input__slot {
      background: transparent !important;
    }
  }
}
</style>