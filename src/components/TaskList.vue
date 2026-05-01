<template>
  <div class="task-list">
    <div v-if="!tasks.length" class="empty-state">No tasks yet.</div>
    <div v-for="task in tasks" :key="task.id" class="task-row">
      <span class="task-title">{{ task.title }}</span>
      <select :value="task.status" @change="$emit('status', task.id, ($event.target as HTMLSelectElement).value)">
        <option>Todo</option>
        <option>Doing</option>
        <option>Done</option>
        <option>Blocked</option>
      </select>
      <small>{{ task.due_date || 'No due date' }}</small>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Task } from '../types/task';

defineProps<{ tasks: Task[] }>();
defineEmits<{ status: [number | string | undefined, string] }>();
</script>
