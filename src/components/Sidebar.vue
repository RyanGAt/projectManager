<template>
  <aside class="sidebar">
    <div class="brand">
      <span class="brand-mark">PV</span>
      <div>
        <h2>ProjectVault</h2>
        <p>Build tracker</p>
      </div>
    </div>
    <nav class="nav-list">
      <RouterLink v-for="item in items" :key="item.to" :to="item.to">
        <i :class="item.icon"></i>
        <span>{{ item.label }}</span>
      </RouterLink>
    </nav>
  </aside>
</template>

<script setup lang="ts">
const items = [
  { label: 'Dashboard', to: '/', icon: 'pi pi-th-large' },
  { label: 'Projects', to: '/projects', icon: 'pi pi-folder' },
  { label: 'Tasks', to: '/tasks', icon: 'pi pi-check-square' },
  { label: 'Docs', to: '/docs', icon: 'pi pi-book' },
  { label: 'Archive', to: '/archive', icon: 'pi pi-box' },
  { label: 'Settings', to: '/settings', icon: 'pi pi-cog' }
];
</script>
