export type journalType = {
  id?: string;
  userEmail: string;
  title: string;
  value: string;
  dateCreated: string;
  label?: string;
  style?: string;
};

export type User = {
  email: string;
  id: string;
  profilePicture?: string;
};

export type DisplayJournalType = {
  activeJournal: journalType[];
  dateCreated: string;
};

export type TodoItemType = {
  userEmail: string;
  categoryId: string;
  id: string;
  value: string;
};

export type BackendTodoType = {
  userEmail: string;
  id: string;
  headerTitle: string;
};

export type TodoType = {
  userEmail: string;
  id: string;
  todoItems: TodoItemType[];
  headerTitle: string;
};

export type SubscriptionType = "free" | "pro" | "unlimited";
