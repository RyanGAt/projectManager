import { getDb } from './database';
export const fileService={
 async byProject(projectId:number){ return await (await getDb()).select('SELECT * FROM project_files WHERE project_id=? ORDER BY created_at DESC',[projectId]);},
 async create(projectId:number,file_path:string,file_type:string,caption:string){ await (await getDb()).execute('INSERT INTO project_files (project_id,file_path,file_type,caption) VALUES (?,?,?,?)',[projectId,file_path,file_type,caption]);},
 async remove(id:number){ await (await getDb()).execute('DELETE FROM project_files WHERE id=?',[id]);}
};
