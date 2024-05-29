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

// [
//   {
//     dateCreated: "2024-5-18",
//     name: "Kolo",
//   },
//   {
//     dateCreated: "2024-5-18",
//     name: "Kolo",
//   },
//   {
//     dateCreated: "2024-5-14",
//     name: "Kolo",
//   },
//   {
//     dateCreated: "2024-5-14",
//     name: "Dave",
//   },
// ];
