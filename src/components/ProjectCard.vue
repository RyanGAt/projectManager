<template>
  <article class="project-card">
    <div class="project-card__top">
      <div>
        <h3>{{ project.name }}</h3>
        <p>{{ project.category || 'Uncategorised' }} · {{ project.status || 'Idea' }}</p>
      </div>
      <span class="status-pill">{{ project.priority || 'Normal' }}</span>
    </div>
    <div class="progress-row">
      <progress :value="project.progress || 0" max="100" />
      <span>{{ project.progress || 0 }}%</span>
    </div>
    <RouterLink class="button button--ghost" :to="`/projects/${project.id}`">
      <i class="pi pi-arrow-right"></i>
      <span>Open</span>
    </RouterLink>
  </article>
</template>

<script setup lang="ts">
import type { Project } from '../types/project';

defineProps<{ project: Project }>();
</script>
