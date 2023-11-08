<template>
  <div>
    <v-menu
        bottom
        left
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            color="primary"
            icon
            v-bind="attrs"
            v-on="on"
        >
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
            v-for="(item, i) in items"
            :key="i"
            @click="handleClick(i)"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon" />
          </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <dialog-edit
        v-if="dialogs.edit"
        :task="task"
        @close="dialogs.edit = false"
    />
    <dialog-due-date
        v-if="dialogs.dueDate"
        :task="task"
        @close="dialogs.dueDate = false"
    />
    <dialog-delete
        v-if="dialogs.delete"
        :id="task.id"
        @close="dialogs.delete = false"
    />
  </div>
</template>

<script>
import DialogEdit from "./Dialogs/DialogEdit.vue";
import DialogDueDate from "./Dialogs/DialogDueDate.vue";
import DialogDelete from "./Dialogs/DialogDelete.vue";

export default {
  props: ['task'],
  components: {
    DialogEdit,
    DialogDueDate,
    DialogDelete,
  },
  data: () => ({
    dialogs: {
      edit: false,
      dueDate: false,
      delete: false,
    },
    items: [
      {
        title: "Edit",
        icon: "mdi-pencil",
        click() {
          this.dialogs.edit = true
        }
      },
      {
        title: "Due date",
        icon: "mdi-calendar",
        click() {
          this.dialogs.dueDate = true
        }
      },
      {
        title: "Sort",
        icon: "mdi-drag-horizontal-variant",
        click() {
          if (!this.$store.state.search) {
            this.$store.commit('toggleSorting')
          } else {
            this.$store.commit('showSnackbar', 'How DARE you try to sort while searching!')
          }
        }
      },
      {
        title: "Delete",
        icon: "mdi-delete",
        click() {
          this.dialogs.delete = true
        }
      },
    ],
  }),
  methods: {
    handleClick(index) {
      this.items[index].click.call(this)
    }
  },
}
</script>
