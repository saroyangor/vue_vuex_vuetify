<template>
  <v-dialog
      :value="true"
      persistent
      max-width="290"
  >
    <v-card>
      <v-card-title class="text-h5">
        Edit task
      </v-card-title>
      <v-card-text>
        Edit the title of this task:
        <v-text-field
            v-model="taskTitle"
            @keyup.enter="saveTask"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            text
            @click="$emit('close')"
        >
          Cancel
        </v-btn>
        <v-btn
            color="red darken-1"
            :disabled="taskTitleInvalid"
            text
            @click="saveTask"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['task'],
  data: () => ({
    taskTitle: '',
  }),
  computed: {
    taskTitleInvalid() {
      return !this.taskTitle.trim() || this.taskTitle.trim() === this.task.title
    }
  },
  methods: {
    saveTask() {
      if (!this.taskTitleInvalid) {
        const payload = {
          id: this.task.id,
          title: this.taskTitle.trim(),
        }

        this.$store.dispatch('updateTaskTitle', payload)
        this.$emit('close')
        this.$vuetify.goTo(0, { duration: 0 })
      }
    },
  },
  mounted() {
    this.taskTitle = this.task.title
  }
}
</script>

<style lang="scss" scoped>

</style>