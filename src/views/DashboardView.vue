<template>
  <div>
    <header class="page-header">
      <div>
        <p class="eyebrow">Overview</p>
        <h1>Dashboard</h1>
      </div>
    </header>
    <div class="card-grid stats-grid">
      <DashboardCard title="Total Projects" :value="stats.total" />
      <DashboardCard title="Active" :value="stats.active" />
      <DashboardCard title="Paused" :value="stats.paused" />
      <DashboardCard title="Completed" :value="stats.completed" />
    </div>
    <section class="panel">
      <div class="panel-heading">
        <div>
          <p class="eyebrow">Recent</p>
          <h3>Recently Updated</h3>
        </div>
      </div>
      <div class="card-grid">
        <ProjectCard v-for="p in projects.slice(0,4)" :key="p.id" :project="p" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">import { onMounted, reactive, ref } from 'vue';import { setupDatabase } from '../db/setupDatabase';import { projectService } from '../db/projectService';import DashboardCard from '../components/DashboardCard.vue';import ProjectCard from '../components/ProjectCard.vue';const projects=ref<any[]>([]);const stats=reactive({total:0,active:0,paused:0,completed:0});onMounted(async()=>{await setupDatabase();projects.value=await projectService.all();stats.total=projects.value.length;stats.active=projects.value.filter(p=>p.status==='Active').length;stats.paused=projects.value.filter(p=>p.status==='Paused').length;stats.completed=projects.value.filter(p=>p.status==='Finished').length;});</script>
