<template>
  <div
      class="no-tasks"
  >
    <v-icon
        size="100"
        color="primary"
    >
      mdi-check
    </v-icon>
    <p class="text-h5 primary--text">No tasks</p>
  </div>
</template>

<style lang="scss" scoped>
.no-tasks {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.5;
}
</style>