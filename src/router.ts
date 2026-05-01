import { createRouter, createWebHashHistory } from 'vue-router';
import ProjectsView from './views/ProjectsView.vue';
import ProjectDetailView from './views/ProjectDetailView.vue';
import ArchiveView from './views/ArchiveView.vue';
import DocsView from './views/DocsView.vue';
import SettingsView from './views/SettingsView.vue';

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: ProjectsView },
    { path: '/projects', redirect: '/' },
    { path: '/projects/:id', component: ProjectDetailView, props: true },
    { path: '/docs', component: DocsView },
    { path: '/docs/:id', component: DocsView, props: true },
    { path: '/archive', component: ArchiveView },
    { path: '/settings', component: SettingsView }
  ]
});
