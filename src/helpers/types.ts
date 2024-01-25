export type Group = {
  id: number;
  title: string;
};

export type Task = {
  id: number;
  groupId: number;
  title: string;
  description: string;
};
