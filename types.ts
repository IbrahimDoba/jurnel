import ReactQuill from "react-quill";

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
export type EditorProp = {
  editorValue: ReactQuill.Value;
  refId: string;
  dateCreated: string;
};

export type TodoType = {
  userEmail: string;
  id: string;
  headerTitle: string;
  value: string;
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
