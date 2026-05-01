<template>
  <div class="panel form-panel">
    <div class="panel-heading">
      <div>
        <p class="eyebrow">Project</p>
        <h3>{{ project.id ? 'Edit Project' : 'New Project' }}</h3>
      </div>
      <button class="button" @click="$emit('save', local)">
        <i class="pi pi-save"></i>
        <span>Save</span>
      </button>
    </div>
    <div class="form-grid">
      <input v-model="local.name" placeholder="Name" />
      <input v-model="local.category" placeholder="Category" />
      <textarea v-model="local.description" placeholder="Description" />
      <select v-model="local.status">
        <option>Idea</option>
        <option>Active</option>
        <option>Paused</option>
        <option>Finished</option>
        <option>Abandoned</option>
        <option>Archived</option>
      </select>
      <select v-model="local.priority">
        <option>Low</option>
        <option>Normal</option>
        <option>High</option>
      </select>
      <input v-model.number="local.progress" type="number" min="0" max="100" placeholder="Progress" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';
import type { Project } from '../types/project';

const props = defineProps<{ project: Project }>();
defineEmits<{ save: [Project] }>();
const local = reactive<Project>({ ...props.project });

watch(() => props.project, (value) => Object.assign(local, value));
</script>
