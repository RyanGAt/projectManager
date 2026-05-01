<template>
  <div class="task-form">
    <input v-model="title" placeholder="Task title" />
    <select v-model="status">
      <option>Todo</option>
      <option>Doing</option>
      <option>Done</option>
      <option>Blocked</option>
    </select>
    <button class="button" @click="save">
      <i class="pi pi-plus"></i>
      <span>Add Task</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{ save: [{ title: string; status: string }] }>();
const title = ref('');
const status = ref('Todo');

const save = () => {
  if (!title.value.trim()) return;
  emit('save', { title: title.value, status: status.value });
  title.value = '';
};
</script>
