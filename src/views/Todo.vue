<template>
  <div class="home">
    <list-tasks v-if="$store.state.tasks.length" />
    <no-task v-else />

    <button-done-sorting v-if="$store.state.sorting" />
  </div>
</template>

<script>
import ListTasks from "@/components/Todo/ListTasks.vue";
import NoTask from "@/components/Todo/NoTask.vue";
import ButtonDoneSorting from "@/components/Todo/ButtonDoneSorting.vue";

export default {
  name: 'Home',
  components: {
    ListTasks,
    NoTask,
    ButtonDoneSorting,
  },
}
</script>
