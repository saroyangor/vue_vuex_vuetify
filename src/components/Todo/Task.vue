<template>
  <div>
    <v-list-item
        @click="$store.dispatch('doneTask', task.id)"
        :class="{ 'blue lighten-5': task.done }"
        class="white"
        :ripple="false"
    >
      <template v-slot:default>
        <v-list-item-action>
          <v-checkbox
              :input-value="task.done"
              color="primary"
          ></v-checkbox>
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title
              :class="{ 'text-decoration-line-through': task.done }"
          >
            {{ task.title }}
          </v-list-item-title>
        </v-list-item-content>

        <v-list-item-action v-if="task.dueDate">
          <v-list-item-action-text>
            <v-icon small>mdi-calendar</v-icon>
            {{ task.dueDate | niceDate }}
          </v-list-item-action-text>
        </v-list-item-action>

        <v-list-item-action>
          <task-menu :task="task" />
        </v-list-item-action>

        <v-list-item-action
            v-if="$store.state.sorting"
        >
          <v-btn
              class="handle"
              color="primary"
              icon
          >
            <v-icon>mdi-drag-horizontal-variant</v-icon>
          </v-btn>
        </v-list-item-action>
      </template>
    </v-list-item>
    <v-divider />
  </div>
</template>

<script>
import { format } from "date-fns";

import TaskMenu from "@/components/Todo/TaskMenu.vue";

export default {
  props: ['task'],
  components: {
    TaskMenu,
  },
  filters: {
    niceDate(value) {
      return format(new Date(value), 'MMM d')
    }
  },
}
</script>

<style lang="scss">
.sortable-ghost {
  opacity: 0;
}
</style>
