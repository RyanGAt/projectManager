import { getDb } from './database';
import type { Project } from '../types/project';

export const projectService = {
  async all(): Promise<Project[]> { return (await (await getDb()).select('SELECT * FROM projects ORDER BY updated_at DESC')) as Project[]; },
  async byId(id: number): Promise<Project | null> { const rows = await (await getDb()).select('SELECT * FROM projects WHERE id = ?', [id]) as Project[]; return rows[0] || null; },
  async create(p: Project) { await (await getDb()).execute('INSERT INTO projects (name,description,category,status,priority,progress,cover_image_path) VALUES (?,?,?,?,?,?,?)', [p.name,p.description||'',p.category||'',p.status||'Idea',p.priority||'Normal',p.progress||0,p.cover_image_path||'']); },
  async update(id:number,p:Project){ await (await getDb()).execute("UPDATE projects SET name=?,description=?,category=?,status=?,priority=?,progress=?,cover_image_path=?,updated_at=CURRENT_TIMESTAMP WHERE id=?", [p.name,p.description||'',p.category||'',p.status||'Idea',p.priority||'Normal',p.progress||0,p.cover_image_path||'',id]); },
  async remove(id:number){
    const db = await getDb();
    await db.execute('DELETE FROM tasks WHERE project_id=?',[id]);
    await db.execute('DELETE FROM project_logs WHERE project_id=?',[id]);
    await db.execute('DELETE FROM project_docs WHERE project_id=?',[id]);
    await db.execute('DELETE FROM project_files WHERE project_id=?',[id]);
    await db.execute('DELETE FROM project_links WHERE project_id=?',[id]);
    await db.execute('DELETE FROM project_costs WHERE project_id=?',[id]);
    await db.execute('DELETE FROM projects WHERE id=?',[id]);
  }
};
