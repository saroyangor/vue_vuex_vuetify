<template>
  <div class="home">
    <field-add-task />
    <list-tasks v-if="$store.state.tasks.length" />
    <no-task v-else />
  </div>
</template>

<script>
import FieldAddTask from "@/components/Todo/FieldAddTask.vue";
import ListTasks from "@/components/Todo/ListTasks.vue";
import NoTask from "@/components/Todo/NoTask.vue";
export default {
  name: 'Home',
  components: {
    FieldAddTask,
    ListTasks,
    NoTask,
  },
}
</script>
