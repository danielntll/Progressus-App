export type typeGoal = {
  goalUID: string;
  userUID: string;
  title: string;
  description: string | null;
  createdAt: number;
  endDate: string | null;
  counterToCompleteGoal: number;
  currentCounter: number;
  onDays: number[];
  relatedTodoUID: string[];
};

export const defaultGoal: typeGoal = {
  goalUID: "",
  userUID: "",
  title: "",
  description: null,
  createdAt: 0,
  endDate: null,
  counterToCompleteGoal: 0,
  currentCounter: 0,
  onDays: [],
  relatedTodoUID: [],
};
