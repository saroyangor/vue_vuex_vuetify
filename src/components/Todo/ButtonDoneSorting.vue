<template>
  <v-btn
    @click="$store.commit('toggleSorting')"
    class="btn-done-sorting"
    color="primary"
  >
    Done Sorting
  </v-btn>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.btn-done-sorting {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}
</style>