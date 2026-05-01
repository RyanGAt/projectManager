import { getDb } from './database';
export const costService={
 async byProject(projectId:number){ return await (await getDb()).select('SELECT * FROM project_costs WHERE project_id=? ORDER BY created_at DESC',[projectId]);},
 async create(projectId:number,item_name:string,cost:number,notes:string,purchased:number){ await (await getDb()).execute('INSERT INTO project_costs (project_id,item_name,cost,notes,purchased) VALUES (?,?,?,?,?)',[projectId,item_name,cost,notes,purchased]);}
};
