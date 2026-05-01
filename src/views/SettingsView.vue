<template>
  <div>
    <header class="page-header">
      <div>
        <p class="eyebrow">Workspace</p>
        <h1>Settings</h1>
      </div>
    </header>

    <section class="panel settings-panel">
      <div class="panel-heading">
        <div>
          <p class="eyebrow">Project Organisation</p>
          <h3>Categories</h3>
        </div>
        <button class="button" @click="addCategory">
          <i class="pi pi-plus"></i>
          <span>Add Category</span>
        </button>
      </div>
      <div class="resource-form">
        <input v-model="newCategory" placeholder="Category name" />
      </div>
      <div class="category-settings-list">
        <article v-for="category in categories" :key="category.id" class="resource-item">
          <span>{{ category.name }}</span>
          <button class="icon-button danger" @click="removeCategory(category.id)">
            <i class="pi pi-trash"></i>
          </button>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { setupDatabase } from '../db/setupDatabase';
import { categoryService, type Category } from '../db/categoryService';

const categories = ref<Category[]>([]);
const newCategory = ref('');

const load = async () => {
  await setupDatabase();
  categories.value = await categoryService.all();
};

onMounted(load);

const addCategory = async () => {
  if (!newCategory.value.trim()) return;
  await categoryService.create(newCategory.value);
  newCategory.value = '';
  await load();
};

const removeCategory = async (id?: number) => {
  if (!id) return;
  await categoryService.remove(id);
  await load();
};
</script>
