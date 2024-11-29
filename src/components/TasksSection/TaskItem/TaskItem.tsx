import React from "react";
import { Task } from "../../../interfaces";

import InfosTask from "./InfosTask";
import ActionsTaskItem from "./ActionsTaskItem";

const TaskItem: React.FC<{ isListInView1: boolean; task: Task }> = ({
  isListInView1,
  task,
}) => {
  return (
    <>
      <li key={task.id}>
        
        <article
          className={`bg-slate-100 rounded-lg p-3 sm:p-4 flex text-left transition hover:shadow-lg hover:shadow-slate-300 dark:bg-slate-800 dark:hover:shadow-transparent ${
            isListInView1 ? "flex-row sm:h-32" : "flex-col h-52 sm:h-64"
          }`}
        >
          <InfosTask task={task} isListInView1={isListInView1} />
          <ActionsTaskItem task={task} isListInView1={isListInView1} />
        </article>
      </li>
    </>
  );
};

export default React.memo(TaskItem);
