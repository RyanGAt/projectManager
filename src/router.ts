import { createRouter, createWebHashHistory } from 'vue-router';
import DashboardView from './views/DashboardView.vue';
import ProjectsView from './views/ProjectsView.vue';
import ProjectDetailView from './views/ProjectDetailView.vue';
import TasksView from './views/TasksView.vue';
import ArchiveView from './views/ArchiveView.vue';
import SettingsView from './views/SettingsView.vue';

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: DashboardView },
    { path: '/projects', component: ProjectsView },
    { path: '/projects/:id', component: ProjectDetailView, props: true },
    { path: '/tasks', component: TasksView },
    { path: '/archive', component: ArchiveView },
    { path: '/settings', component: SettingsView }
  ]
});
