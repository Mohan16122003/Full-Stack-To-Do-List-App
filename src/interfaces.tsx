export interface Task {
  title: string;
  dir?: string; // Made optional
  description: string;
  date: string;
  due_date: string;
  status: number;
  completed: boolean;
  id: string;
}
