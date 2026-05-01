<template>
  <div>
    <header class="page-header">
      <div>
        <p class="eyebrow">Work queue</p>
        <h1>All Tasks</h1>
      </div>
    </header>
    <section class="panel">
      <TaskList :tasks="tasks" @status="updateStatus" />
    </section>
  </div>
</template>

<script setup lang="ts">import { onMounted, ref } from 'vue';import TaskList from '../components/TaskList.vue';import { taskService } from '../db/taskService';const tasks=ref<any[]>([]);const load=async()=>tasks.value=await taskService.all();onMounted(load);const updateStatus=async(id:any,status:string)=>{const t=tasks.value.find((x:any)=>x.id===Number(id)); if(!t) return; await taskService.update(t.id,{...t,status}); await load();};</script>
