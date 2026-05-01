import { getDb } from './database';

export interface Category {
  id?: number;
  name: string;
}

const defaultCategories = [
  'Website / Brand',
  'Hardware / Mods',
  'Apps / Tools',
  'Music / Guitars',
  'Game Dev',
  'Art / Visual Identity',
  'Automation',
  'Media'
];

export const categoryService = {
  async ensureDefaults() {
    const db = await getDb();
    for (const name of defaultCategories) {
      await db.execute('INSERT OR IGNORE INTO categories (name) VALUES (?)', [name]);
    }
  },

  async all(): Promise<Category[]> {
    return await (await getDb()).select('SELECT * FROM categories ORDER BY name ASC') as Category[];
  },

  async create(name: string) {
    await (await getDb()).execute('INSERT OR IGNORE INTO categories (name) VALUES (?)', [name.trim()]);
  },

  async remove(id: number) {
    await (await getDb()).execute('DELETE FROM categories WHERE id = ?', [id]);
  }
};
