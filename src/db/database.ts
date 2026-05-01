import Database from '@tauri-apps/plugin-sql';

let db: Database | null = null;
export const getDb = async () => {
  if (!db) db = await Database.load('sqlite:projectvault.db');
  return db;
};
