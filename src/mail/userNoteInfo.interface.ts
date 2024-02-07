export interface userNoteInfo {
  notes: {
    title: string;
    content: string;
  };

  receiver: {
    name: string;
    email: string;
  };

  sender: {
    name: string;
  };
}
