<template>
  <div>
    <header class="page-header">
      <div>
        <p class="eyebrow">History</p>
        <h1>Archive</h1>
      </div>
    </header>
    <div class="card-grid">
      <ProjectCard v-for="p in archived" :key="p.id" :project="p" />
    </div>
    <div v-if="!archived.length" class="empty-state">No archived projects yet.</div>
  </div>
</template>

<script setup lang="ts">import { computed, onMounted, ref } from 'vue';import { setupDatabase } from '../db/setupDatabase';import { projectService } from '../db/projectService';import ProjectCard from '../components/ProjectCard.vue';const projects=ref<any[]>([]);onMounted(async()=>{await setupDatabase();projects.value=await projectService.all();});const archived=computed(()=>projects.value.filter(p=>['Finished','Abandoned','Archived'].includes(p.status)));</script>
