<template>
  <div>
    <header class="page-header">
      <div>
        <p class="eyebrow">Documentation</p>
        <h1>Docs</h1>
      </div>
      <input v-model="search" class="search-input" placeholder="Search docs" />
    </header>

    <section class="doc-directory">
      <RouterLink v-for="project in filteredProjects" :key="project.id" class="doc-directory-row" :to="`/projects/${project.id}?tab=docs`">
        <div>
          <h3>{{ project.name }}</h3>
          <p>{{ project.category || 'Project' }} · {{ project.status || 'Idea' }}</p>
        </div>
        <i class="pi pi-arrow-right"></i>
      </RouterLink>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { setupDatabase } from '../db/setupDatabase';
import { projectService } from '../db/projectService';

const projects = ref<any[]>([]);
const search = ref('');

const filteredProjects = computed(() => {
  const term = search.value.toLowerCase();
  return projects.value.filter((project) => project.name.toLowerCase().includes(term));
});

onMounted(async () => {
  await setupDatabase();
  projects.value = await projectService.all();
});
</script>
