export type journalType = {
  id?: string;
  userEmail: string;
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
