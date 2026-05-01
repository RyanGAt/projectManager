<template><div class="app-layout"><Sidebar/><main class="main"><RouterView/></main><aside class="right-panel"><h4>Quick Notes</h4><textarea placeholder="Write quick notes..."></textarea><h4>Next actions</h4><p>Plan next sprint tasks.</p></aside></div></template>
<script setup lang="ts">import Sidebar from './components/Sidebar.vue';</script>
