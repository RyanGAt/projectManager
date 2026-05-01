import { getDb } from './database';

export interface ProjectDoc {
  id?: number;
  project_id: number;
  title: string;
  content: string;
  updated_at?: string;
}

export const docService = {
  async byProject(projectId: number): Promise<ProjectDoc> {
    const db = await getDb();
    const docs = await db.select(
      'SELECT * FROM project_docs WHERE project_id = ? LIMIT 1',
      [projectId]
    ) as ProjectDoc[];

    if (docs[0]) return docs[0];

    const brief = await db.select(
      'SELECT title, content FROM project_logs WHERE project_id = ? ORDER BY created_at ASC LIMIT 1',
      [projectId]
    ) as { title: string; content?: string }[];

    return {
      project_id: projectId,
      title: brief[0]?.title || 'Project Notes',
      content: brief[0]?.content || ''
    };
  },

  async save(projectId: number, title: string, content: string) {
    const db = await getDb();
    const existing = await db.select(
      'SELECT id FROM project_docs WHERE project_id = ? LIMIT 1',
      [projectId]
    ) as { id: number }[];

    if (existing[0]) {
      await db.execute(
        'UPDATE project_docs SET title = ?, content = ?, updated_at = CURRENT_TIMESTAMP WHERE project_id = ?',
        [title, content, projectId]
      );
      return;
    }

    await db.execute(
      'INSERT INTO project_docs (project_id, title, content) VALUES (?, ?, ?)',
      [projectId, title, content]
    );
  }
};
