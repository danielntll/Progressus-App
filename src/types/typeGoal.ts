export type typeGoal = {
  goalUID: string;
  userUID: string;
  title: string;
  description: string | null;
  createdAt: string;
  endDate: string | null;
  counterToCompleteGoal: number;
  currentCounter: number;
  onDays: number[];
  relatedTodoUID: string[];
};
