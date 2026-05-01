import { getDb } from './database';
export const logService={
 async byProject(projectId:number){ return await (await getDb()).select('SELECT * FROM project_logs WHERE project_id=? ORDER BY created_at DESC',[projectId]);},
 async create(projectId:number,title:string,content:string){ await (await getDb()).execute('INSERT INTO project_logs (project_id,title,content) VALUES (?,?,?)',[projectId,title,content]);}
};
