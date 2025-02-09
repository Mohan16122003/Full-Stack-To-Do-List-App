import React from "react";
import BtnAddTask from "../Utilities/BtnAddTask";
import SearchField from "./SearchField";


const HeaderTasks: React.FC = () => {
  const date: Date = new Date();
  const year: number = date.getFullYear();
  const month: number = date.getMonth();
  const day: number = date.getDate();

  const monthName: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const todayDate = `${year}, ${monthName[month].slice(0, 3)} ${day
    .toString()
    .padStart(2, "0")}`;

  const dateTimeFormat = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}}`;


  return (
    <header className="items-center grid grid-cols-[1fr_auto_1fr] gap-4 md:gap-0 md:flex ">
      <SearchField />
      <div className="text-center">
        <time dateTime={dateTimeFormat}>{todayDate}</time>
      </div>
      <div className="flex flex-1 justify-end">
        <BtnAddTask className="sm:static fixed bottom-3 right-3 z-10 sm:z-0 min-w-max shadow-lg shadow-slate-400  dark:shadow-slate-900 sm:shadow-transparent" />
      </div>
    </header>
  );
};

export default HeaderTasks;
