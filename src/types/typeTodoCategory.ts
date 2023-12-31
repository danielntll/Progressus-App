/**
  Daily - for tasks within the day;

  Goal - for tasks categorized as Objectives, which therefore have a recurring schedule, a counter, and a deadline date;

  Folder - for tasks categorized as part of a folder, which can be rescheduled and have additional characteristics.
 */

export type typeTodoCategory = {
  name: "Daily" | "Goal" | "Folder";
  icon: string;
  color: string;
};

export type typeTodoCategoryNames = "Daily" | "Goal" | "Folder";
