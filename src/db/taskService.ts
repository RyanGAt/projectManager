import { getDb } from './database';
import type { Task } from '../types/task';
export const taskService = {
  async all(): Promise<Task[]> { return (await (await getDb()).select('SELECT * FROM tasks ORDER BY COALESCE(due_date,\'9999-12-31\') ASC')) as Task[]; },
  async byProject(projectId:number): Promise<Task[]> { return (await (await getDb()).select('SELECT * FROM tasks WHERE project_id=? ORDER BY sort_order ASC,id DESC',[projectId])) as Task[]; },
  async create(t: Task){ await (await getDb()).execute('INSERT INTO tasks (project_id,title,description,status,priority,due_date,sort_order) VALUES (?,?,?,?,?,?,?)',[t.project_id,t.title,t.description||'',t.status||'Todo',t.priority||'Normal',t.due_date||null,t.sort_order||0]); },
  async update(id:number,t:Partial<Task>){ await (await getDb()).execute('UPDATE tasks SET title=?,description=?,status=?,priority=?,due_date=?,updated_at=CURRENT_TIMESTAMP WHERE id=?',[t.title,t.description||'',t.status||'Todo',t.priority||'Normal',t.due_date||null,id]); }
};
