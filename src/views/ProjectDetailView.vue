<template>
  <div v-if="project">
    <header class="page-header">
      <div>
        <p class="eyebrow">{{ project.category || 'Project' }}</p>
        <h1>{{ project.name }}</h1>
      </div>
      <RouterLink class="button button--ghost" to="/">
        <i class="pi pi-arrow-left"></i>
        <span>Projects</span>
      </RouterLink>
    </header>

    <nav class="tabs">
      <button v-for="tab in tabs" :key="tab.id" :class="{ 'is-active': activeTab === tab.id }" @click="activeTab = tab.id">
        <i :class="tab.icon"></i>
        <span>{{ tab.label }}</span>
      </button>
    </nav>

    <section v-if="activeTab === 'details'" class="panel">
      <div class="panel-heading">
        <div>
          <p class="eyebrow">Settings</p>
          <h3>Project Details</h3>
        </div>
        <div class="page-actions">
          <button class="button button--ghost danger-action" @click="deleteProject">
            <i class="pi pi-trash"></i>
            <span>Delete</span>
          </button>
          <button class="button" @click="saveProject">
            <i class="pi pi-save"></i>
            <span>Save</span>
          </button>
        </div>
      </div>
      <div class="form-grid">
        <input v-model="project.name" placeholder="Name" />
        <select v-model="project.category">
          <option value="">Choose category</option>
          <option v-for="category in categories" :key="category.id" :value="category.name">{{ category.name }}</option>
        </select>
        <textarea v-model="project.description" placeholder="Description"></textarea>
        <select v-model="project.status">
          <option>Idea</option>
          <option>Active</option>
          <option>Paused</option>
          <option>Finished</option>
          <option>Abandoned</option>
          <option>Archived</option>
        </select>
        <select v-model="project.priority">
          <option>Low</option>
          <option>Normal</option>
          <option>High</option>
        </select>
        <input v-model.number="project.progress" type="number" min="0" max="100" placeholder="Progress" />
      </div>
      <div class="cover-picker">
        <div class="cover-preview">
          <img v-if="project.cover_image_path" :src="assetSrc(project.cover_image_path)" :alt="project.name" />
          <span v-else>No photo selected</span>
        </div>
        <div>
          <p class="eyebrow">Project Photo</p>
          <h3>Card Image</h3>
          <p class="description">Pick an image to use on the main projects screen.</p>
          <div class="page-actions">
            <button class="button" @click="pickCoverImage">
              <i class="pi pi-image"></i>
              <span>Choose Photo</span>
            </button>
            <button v-if="project.cover_image_path" class="button button--ghost" @click="clearCoverImage">
              <i class="pi pi-times"></i>
              <span>Remove</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <section v-if="activeTab === 'tasks'" class="panel">
      <div class="panel-heading">
        <div>
          <p class="eyebrow">Todo</p>
          <h3>Tasks</h3>
        </div>
      </div>
      <TaskForm @save="addTask" />
      <TaskList :tasks="tasks" @status="updateStatus" />
    </section>

    <section v-if="activeTab === 'docs'" class="doc-editor-shell">
      <header class="doc-editor-header">
        <div>
          <p class="eyebrow">Document</p>
          <h1>{{ project.name }}</h1>
        </div>
        <button class="button" @click="saveDoc">
          <i class="pi pi-save"></i>
          <span>{{ saveLabel }}</span>
        </button>
      </header>
      <div class="doc-paper">
        <input v-model="docTitle" class="doc-title-input" placeholder="Document title" />
        <textarea v-model="docContent" class="doc-editor" placeholder="Write project notes, plans, build logs, resources..."></textarea>
      </div>
    </section>

    <section v-if="activeTab === 'resources'" class="resources-layout">
      <div class="panel">
        <div class="panel-heading">
          <div>
            <p class="eyebrow">Links</p>
            <h3>Resources</h3>
          </div>
          <button class="button" @click="addLink">
            <i class="pi pi-plus"></i>
            <span>Add Link</span>
          </button>
        </div>
        <div class="resource-form">
          <input v-model="linkTitle" placeholder="Title" />
          <input v-model="linkUrl" placeholder="URL" />
        </div>
        <div class="resource-list">
          <article v-for="link in links" :key="link.id" class="resource-item">
            <a :href="link.url" target="_blank">{{ link.title }}</a>
            <button class="icon-button danger" @click="removeLink(link.id)"><i class="pi pi-trash"></i></button>
          </article>
        </div>
      </div>

      <div class="panel">
        <div class="panel-heading">
          <div>
            <p class="eyebrow">Images / Files</p>
            <h3>Files</h3>
          </div>
          <div class="page-actions">
            <button class="button button--ghost" @click="pickFolder">
              <i class="pi pi-folder"></i>
              <span>Folder</span>
            </button>
            <button class="button" @click="pickFiles">
              <i class="pi pi-file"></i>
              <span>Files</span>
            </button>
          </div>
        </div>
        <div class="resource-form">
          <input v-model="filePath" placeholder="File path or image URL" />
          <input v-model="fileCaption" placeholder="Caption" />
          <button class="button button--ghost" @click="addFile">
            <i class="pi pi-plus"></i>
            <span>Add Manual Path</span>
          </button>
        </div>
        <div class="resource-list">
          <article v-for="file in files" :key="file.id" class="resource-item">
            <button class="resource-path" @click="revealFile(file.file_path)">
              <strong>{{ file.caption || file.file_path }}</strong>
              <small>{{ file.file_path }}</small>
            </button>
            <button class="icon-button danger" @click="removeFile(file.id)"><i class="pi pi-trash"></i></button>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { convertFileSrc, invoke } from '@tauri-apps/api/core';
import { open } from '@tauri-apps/plugin-dialog';
import { projectService } from '../db/projectService';
import { taskService } from '../db/taskService';
import { docService } from '../db/docService';
import { fileService } from '../db/fileService';
import { linkService } from '../db/linkService';
import { categoryService, type Category } from '../db/categoryService';
import TaskForm from '../components/TaskForm.vue';
import TaskList from '../components/TaskList.vue';

const route = useRoute();
const router = useRouter();
const id = Number(route.params.id);
const project = ref<any>(null);
const categories = ref<Category[]>([]);
const tasks = ref<any[]>([]);
const files = ref<any[]>([]);
const links = ref<any[]>([]);
const activeTab = ref(typeof route.query.tab === 'string' ? route.query.tab : 'details');
const docTitle = ref('');
const docContent = ref('');
const saveLabel = ref('Save');
const linkTitle = ref('');
const linkUrl = ref('');
const filePath = ref('');
const fileCaption = ref('');
const tabs = [
  { id: 'details', label: 'Details', icon: 'pi pi-sliders-h' },
  { id: 'tasks', label: 'Tasks / Todo', icon: 'pi pi-check-square' },
  { id: 'docs', label: 'Docs', icon: 'pi pi-book' },
  { id: 'resources', label: 'Resources', icon: 'pi pi-images' }
];

const load = async () => {
  project.value = await projectService.byId(id);
  categories.value = await categoryService.all();
  tasks.value = await taskService.byProject(id);
  files.value = await fileService.byProject(id) as any[];
  links.value = await linkService.byProject(id) as any[];
  const doc = await docService.byProject(id);
  docTitle.value = doc.title;
  docContent.value = doc.content;
};

onMounted(load);

const saveProject = async () => {
  if (!project.value) return;
  await projectService.update(id, project.value);
  await load();
};

const assetSrc = (path: string) => path.startsWith('http') ? path : convertFileSrc(path);

const pickCoverImage = async () => {
  const selected = await open({
    multiple: false,
    directory: false,
    filters: [{ name: 'Images', extensions: ['png', 'jpg', 'jpeg', 'webp', 'gif', 'bmp'] }]
  });

  if (!selected || Array.isArray(selected) || !project.value) return;
  project.value.cover_image_path = selected;
  await saveProject();
};

const clearCoverImage = async () => {
  if (!project.value) return;
  project.value.cover_image_path = '';
  await saveProject();
};

const deleteProject = async () => {
  if (!window.confirm(`Delete ${project.value?.name || 'this project'}?`)) return;
  await projectService.remove(id);
  await router.push('/');
};

const addTask = async (t: any) => {
  await taskService.create({ project_id: id, title: t.title, status: t.status });
  await load();
};

const updateStatus = async (taskId: any, status: string) => {
  const task = tasks.value.find((x) => x.id === Number(taskId));
  if (!task) return;
  await taskService.update(task.id, { ...task, status });
  await load();
};

const saveDoc = async () => {
  await docService.save(id, docTitle.value || 'Project Notes', docContent.value);
  saveLabel.value = 'Saved';
  window.setTimeout(() => {
    saveLabel.value = 'Save';
  }, 1400);
};

const addLink = async () => {
  if (!linkTitle.value || !linkUrl.value) return;
  await linkService.create(id, linkTitle.value, linkUrl.value);
  linkTitle.value = '';
  linkUrl.value = '';
  await load();
};

const removeLink = async (linkId?: number) => {
  if (!linkId) return;
  await linkService.remove(linkId);
  await load();
};

const addFile = async () => {
  if (!filePath.value) return;
  await fileService.create(id, filePath.value, 'file', fileCaption.value);
  filePath.value = '';
  fileCaption.value = '';
  await load();
};

const pickFiles = async () => {
  const selected = await open({ multiple: true, directory: false });
  const paths = Array.isArray(selected) ? selected : selected ? [selected] : [];

  for (const path of paths) {
    await fileService.create(id, path, 'file', '');
  }

  await load();
};

const pickFolder = async () => {
  const selected = await open({ multiple: false, directory: true });
  if (!selected || Array.isArray(selected)) return;
  await fileService.create(id, selected, 'folder', '');
  await load();
};

const revealFile = async (path: string) => {
  await invoke('reveal_path', { path });
};

const removeFile = async (fileId?: number) => {
  if (!fileId) return;
  await fileService.remove(fileId);
  await load();
};
</script>
