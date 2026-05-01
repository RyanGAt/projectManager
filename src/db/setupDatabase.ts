import { getDb } from './database';
import { categoryService } from './categoryService';

export const setupDatabase = async () => {
  const db = await getDb();
  await db.execute(`CREATE TABLE IF NOT EXISTS projects (id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT NOT NULL,description TEXT,category TEXT,status TEXT DEFAULT 'Idea',priority TEXT DEFAULT 'Normal',progress INTEGER DEFAULT 0,cover_image_path TEXT,created_at TEXT DEFAULT CURRENT_TIMESTAMP,updated_at TEXT DEFAULT CURRENT_TIMESTAMP);`);
  await db.execute(`CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT,project_id INTEGER NOT NULL,title TEXT NOT NULL,description TEXT,status TEXT DEFAULT 'Todo',priority TEXT DEFAULT 'Normal',due_date TEXT,sort_order INTEGER DEFAULT 0,created_at TEXT DEFAULT CURRENT_TIMESTAMP,updated_at TEXT DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY(project_id) REFERENCES projects(id));`);
  await db.execute(`CREATE TABLE IF NOT EXISTS project_logs (id INTEGER PRIMARY KEY AUTOINCREMENT,project_id INTEGER NOT NULL,title TEXT NOT NULL,content TEXT,created_at TEXT DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY(project_id) REFERENCES projects(id));`);
  await db.execute(`CREATE TABLE IF NOT EXISTS project_docs (id INTEGER PRIMARY KEY AUTOINCREMENT,project_id INTEGER NOT NULL UNIQUE,title TEXT NOT NULL DEFAULT 'Project Notes',content TEXT DEFAULT '',updated_at TEXT DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY(project_id) REFERENCES projects(id));`);
  await db.execute(`CREATE TABLE IF NOT EXISTS project_files (id INTEGER PRIMARY KEY AUTOINCREMENT,project_id INTEGER NOT NULL,file_path TEXT NOT NULL,file_type TEXT,caption TEXT,created_at TEXT DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY(project_id) REFERENCES projects(id));`);
  await db.execute(`CREATE TABLE IF NOT EXISTS project_links (id INTEGER PRIMARY KEY AUTOINCREMENT,project_id INTEGER NOT NULL,title TEXT NOT NULL,url TEXT NOT NULL,created_at TEXT DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY(project_id) REFERENCES projects(id));`);
  await db.execute(`CREATE TABLE IF NOT EXISTS project_costs (id INTEGER PRIMARY KEY AUTOINCREMENT,project_id INTEGER NOT NULL,item_name TEXT NOT NULL,cost REAL DEFAULT 0,notes TEXT,purchased INTEGER DEFAULT 0,created_at TEXT DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY(project_id) REFERENCES projects(id));`);
  await db.execute(`CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT NOT NULL UNIQUE);`);
  await categoryService.ensureDefaults();
};
