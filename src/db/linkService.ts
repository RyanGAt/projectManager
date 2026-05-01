import { getDb } from './database';
export const linkService={
 async byProject(projectId:number){ return await (await getDb()).select('SELECT * FROM project_links WHERE project_id=? ORDER BY created_at DESC',[projectId]);},
 async create(projectId:number,title:string,url:string){ await (await getDb()).execute('INSERT INTO project_links (project_id,title,url) VALUES (?,?,?)',[projectId,title,url]);},
 async remove(id:number){ await (await getDb()).execute('DELETE FROM project_links WHERE id=?',[id]);}
};
