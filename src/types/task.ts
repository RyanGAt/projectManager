export interface Task {
  id?: number;
  project_id: number;
  title: string;
  description?: string;
  status?: string;
  priority?: string;
  due_date?: string;
  sort_order?: number;
  created_at?: string;
  updated_at?: string;
}
