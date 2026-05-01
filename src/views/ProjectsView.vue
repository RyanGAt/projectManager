<template>
  <div class="vault-page">
    <header class="vault-hero">
      <div>
        <p class="eyebrow">Project Library</p>
        <h1>All Projects</h1>
        <p>{{ visibleProjects.length }} projects across {{ groupedProjects.length }} categories</p>
      </div>
      <div class="vault-toolbar">
        <div class="vault-search">
          <i class="pi pi-search"></i>
          <input v-model="search" placeholder="Search projects..." />
        </div>
        <div class="segmented">
          <button :class="{ 'is-active': filter === 'Active' }" @click="filter = 'Active'">Active</button>
          <button :class="{ 'is-active': filter === 'Archived' }" @click="filter = 'Archived'">Archived</button>
          <button :class="{ 'is-active': filter === 'All' }" @click="filter = 'All'">All</button>
        </div>
        <button class="button glow-button" @click="showDialog = true">
          <i class="pi pi-plus"></i>
          <span>New Project</span>
        </button>
      </div>
    </header>

    <section v-for="group in groupedProjects" :key="group.category" class="vault-category">
      <button class="vault-category-heading collapsible-heading" @click="toggleCategory(group.category)">
        <span>
          <i :class="collapsedCategories.includes(group.category) ? 'pi pi-folder' : 'pi pi-folder-open'"></i>
          <h2>{{ group.category }}</h2>
        </span>
        <small>{{ group.projects.length }} projects</small>
      </button>
      <div v-if="!collapsedCategories.includes(group.category)" class="vault-project-grid">
        <article v-for="project in group.projects" :key="project.id" class="vault-card">
          <RouterLink class="vault-card-main" :to="`/projects/${project.id}`">
            <div class="vault-thumb">
              <img v-if="project.cover_image_path" :src="assetSrc(project.cover_image_path)" :alt="project.name" />
              <span v-else>{{ initials(project.name) }}</span>
            </div>
            <div>
              <div class="vault-card-title">
                <h3>{{ project.name }}</h3>
                <span class="vault-status" :class="statusClass(project.status)">{{ project.status || 'Idea' }}</span>
              </div>
              <p>{{ project.description || 'No description yet.' }}</p>
            </div>
            <div class="vault-card-progress">
              <progress :value="project.progress || 0" max="100" />
              <span>{{ project.progress || 0 }}%</span>
            </div>
            <footer>
              <span><i class="pi pi-calendar"></i> {{ project.updated_at || 'Not updated' }}</span>
              <span><i class="pi pi-folder"></i> {{ project.category || 'Uncategorised' }}</span>
            </footer>
          </RouterLink>
        </article>
      </div>
    </section>

    <div v-if="!groupedProjects.length" class="empty-state">No projects found.</div>

    <div v-if="showDialog" class="modal-backdrop" @click.self="showDialog = false">
      <section class="modal-panel">
        <div class="panel-heading">
          <div>
            <p class="eyebrow">Create</p>
            <h3>New Project</h3>
          </div>
          <button class="icon-button" @click="showDialog = false"><i class="pi pi-times"></i></button>
        </div>
        <div class="form-grid">
          <input v-model="newProject.name" placeholder="Name" />
          <select v-model="newProject.category">
            <option value="">Choose category</option>
            <option v-for="category in categories" :key="category.id" :value="category.name">{{ category.name }}</option>
          </select>
          <textarea v-model="newProject.description" placeholder="Description"></textarea>
          <select v-model="newProject.status">
            <option>Idea</option>
            <option>Active</option>
            <option>Paused</option>
            <option>Finished</option>
            <option>Abandoned</option>
            <option>Archived</option>
          </select>
          <select v-model="newProject.priority">
            <option>Low</option>
            <option>Normal</option>
            <option>High</option>
          </select>
          <input v-model.number="newProject.progress" type="number" min="0" max="100" placeholder="Progress" />
        </div>
        <div class="modal-actions">
          <button class="button button--ghost" @click="showDialog = false">Cancel</button>
          <button class="button" @click="createProject">
            <i class="pi pi-save"></i>
            <span>Create Project</span>
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { convertFileSrc } from '@tauri-apps/api/core';
import { setupDatabase } from '../db/setupDatabase';
import { projectService } from '../db/projectService';
import { categoryService, type Category } from '../db/categoryService';

const projects = ref<any[]>([]);
const categories = ref<Category[]>([]);
const search = ref('');
const filter = ref<'Active' | 'Archived' | 'All'>('Active');
const showDialog = ref(false);
const collapsedCategories = ref<string[]>([]);
const newProject = ref<any>({ name: '', category: '', description: '', status: 'Idea', priority: 'Normal', progress: 0 });

const archivedStatuses = ['Finished', 'Abandoned', 'Archived'];

const visibleProjects = computed(() => {
  const term = search.value.toLowerCase();
  return projects.value.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(term) || (project.category || '').toLowerCase().includes(term);
    const isArchived = archivedStatuses.includes(project.status);
    const matchesFilter = filter.value === 'All' || (filter.value === 'Archived' ? isArchived : !isArchived);
    return matchesSearch && matchesFilter;
  });
});

const groupedProjects = computed(() => {
  const groups = new Map<string, any[]>();

  for (const project of visibleProjects.value) {
    const category = project.category || 'Uncategorised';
    groups.set(category, [...(groups.get(category) || []), project]);
  }

  return [...groups.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([category, groupProjects]) => ({ category, projects: groupProjects }));
});

const load = async () => {
  await setupDatabase();
  projects.value = await projectService.all();
  categories.value = await categoryService.all();
  if (!newProject.value.category) newProject.value.category = categories.value[0]?.name || '';
};

onMounted(load);

const createProject = async () => {
  if (!newProject.value.name.trim()) return;
  await projectService.create(newProject.value);
  newProject.value = { name: '', category: categories.value[0]?.name || '', description: '', status: 'Idea', priority: 'Normal', progress: 0 };
  showDialog.value = false;
  await load();
};

const toggleCategory = (category: string) => {
  collapsedCategories.value = collapsedCategories.value.includes(category)
    ? collapsedCategories.value.filter((item) => item !== category)
    : [...collapsedCategories.value, category];
};

const initials = (name: string) => name.split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase();
const assetSrc = (path: string) => path.startsWith('http') ? path : convertFileSrc(path);
const statusClass = (status?: string) => ({
  'is-done': status === 'Finished',
  'is-paused': status === 'Paused',
  'is-planning': status === 'Idea',
  'is-archived': status === 'Archived' || status === 'Abandoned'
});
</script>
