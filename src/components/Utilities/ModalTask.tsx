import React, { useRef, useState } from "react";
import { Task } from "../../interfaces";
import { addTaskToDatabase } from "../../store/Tasks.store";

import Modal from "./Modal";

const InputCheckbox: React.FC<{
  label: string;
  isChecked: boolean;
  setChecked: (value: React.SetStateAction<boolean>) => void;
}> = ({ isChecked, setChecked, label }) => {
  return (
    <label className="mb-0 flex items-center cursor-pointer">
      <div className="mr-2 bg-slate-300/[.5] dark:bg-slate-800 w-5 h-5 rounded-full grid place-items-center border border-slate-300 dark:border-slate-700">
        {isChecked && (
          <span className="bg-rose-500 w-2 h-2 block rounded-full"></span>
        )}
      </div>
      <span className="order-1 flex-1">{label}</span>
      <input
        type="checkbox"
        className="sr-only"
        checked={isChecked}
        onChange={() => setChecked((prev: boolean) => !prev)}
      />
    </label>
  );
};

const ModalCreateTask: React.FC<{
  onClose: () => void;
  task?: Task;
  nameForm: string;
  onConfirm: (task: Task) => void;
}> = ({ onClose, task, nameForm, onConfirm }) => {
  const today: Date = new Date();
  let day: number = today.getDate();
  let month: number = today.getMonth() + 1;
  const year: number = today.getFullYear();
  if (day < 10) {
    day = +("0" + day);
  }
  if (month < 10) {
    month = +("0" + month);
  }

  const todayDate: string = year + "-" + month + "-" + day;
  const maxDate: string = year + 1 + "-" + month + "-" + day;

  const [description, setDescription] = useState<string>(() => {
    if (task) {
      return task.description;
    }
    return "";
  });
  const [title, setTitle] = useState<string>(() => {
    if (task) {
      return task.title;
    }
    return "";
  });
  const [date, setDate] = useState<string>(() => {
    if (task) {
      return task.date;
    }
    return todayDate;
  });
  const isTitleValid = useRef<Boolean>(false);
  const isDateValid = useRef<Boolean>(false);

  const [isCompleted, setIsCompleted] = useState<boolean>(() => {
    if (task) {
      return task.completed;
    }
    return false;
  });

  const addNewTaskHandler = (event: React.FormEvent): void => {
    event.preventDefault();

    isTitleValid.current = title.trim().length > 0;
    isDateValid.current = date.trim().length > 0;

    if (isTitleValid.current && isDateValid.current && description.trim().length > 0) {
      const newTask: Task = {
        title: title,
        description: description,
        due_date: date,
        date: date,
        completed: isCompleted,
        status: isCompleted ? 1 : 0,
        id: task?.id ? task.id : Date.now().toString(),
      };
      onConfirm(newTask);
      console.log('Calling addTaskToDatabase with:', newTask);
      addTaskToDatabase(newTask);
      onClose();
    }
  };
  return (
    <Modal onClose={onClose} title={nameForm}>
      <form
        className="flex flex-col stylesInputsField"
        onSubmit={addNewTaskHandler}
      >
        <label>
          Title
          <input
            type="text"
            placeholder="e.g, study for the test"
            required
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            className="w-full"
          />
        </label>
        <label>
          Date
          <input
            type="date"
            className="w-full"
            value={date}
            required
            onChange={({ target }) => setDate(target.value)}
            min={todayDate}
            max={maxDate}
          />
        </label>
        <label>
          Description
          <textarea
            placeholder="e.g, study for the test"
            className="w-full"
            value={description}
            onChange={({ target }) => setDescription(target.value)}
            required
          ></textarea>
        </label>
        <InputCheckbox
          isChecked={isCompleted}
          setChecked={setIsCompleted}
          label="Mark as completed"
        />
        <button type="submit" className="btn mt-5">
          {nameForm}
        </button>
      </form>
    </Modal>
  );
};

export default ModalCreateTask;
