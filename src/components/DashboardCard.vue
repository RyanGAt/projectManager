<template>
  <div class="stat-card">
    <h4>{{ title }}</h4>
    <h2>{{ value }}</h2>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string; value: number | string }>();
</script>
