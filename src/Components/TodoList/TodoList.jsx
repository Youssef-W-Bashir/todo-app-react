import { useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function TodoList() {
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalCheck, setOpenModalCheck] = useState(false);
  const [taskId, setTaskId] = useState(null);

  let { tasks, setTasks, days } = useOutletContext();

  const [dayFilter, setDayFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [checkFilter, setCheckFilter] = useState();

  let handleDelete = (id) => {
    let newTasks = tasks.filter((task) => task.id !== id);

    setTasks(newTasks);
  };

  let filteredTasks = tasks.filter((task) => {
    let filterSelectedDay = dayFilter === "" || task.dueDate === dayFilter;
    let filterSelectedCheck =
      checkFilter === undefined || task.check === checkFilter;
    let filterSelectedPriority =
      priorityFilter === "" || task.priority === priorityFilter;

    return filterSelectedDay && filterSelectedPriority && filterSelectedCheck;
  });

  const handleCheck = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, check: false } : task,
    );

    setTasks(updatedTasks);
  };

  let completedCount = filteredTasks.filter((task) => task.check);
  let pendingCount = filteredTasks.filter((task) => !task.check);
  let tasksCount = filteredTasks.length;

  return (
    <>
      <section className="min-h-[78vh]">
        <div className="w-full px-3 lg:px-6 md:w-3/4 mx-auto">
          <h2 className="capitalize underline text-2xl md:text-3xl w-full md:w-[58%] lg:w-[30%] mb-3 mt-4 md:mb-7 font-bold scale-y-125 text-blue-800">
            {" "}
            Todo List
          </h2>
          <div className="relative overflow-x-hidden shadow-md rounded-2xl sm:rounded-xl w-full mb-8">
            <table className="w-full text-sm text-left text-gray-500 shadow-2xl">
              <caption className="p-3 sm:p-5 text-lg font-semibold text-left text-white bg-gray-800 relative">
                <div className="text-xs absolute rounded-full bg-yellow-600/50 h-20 w-16 md:h-24 md:w-20  justify-center items-center flex flex-col right-20 md:right-24 -top-10">
                  <span className="mt-9 md:mt-8 capitalize">pending</span>
                  <span className="w-5 h-5 flex items-center mt-0.5 justify-center rounded-full bg-gray-800/80">
                    {completedCount.length}
                  </span>
                </div>
                <div className="text-xs absolute rounded-full bg-green-700/50 h-20 w-16 md:h-24 md:w-20  justify-center items-center flex flex-col right-3 -top-10">
                  <span className="mt-9 md:mt-8 capitalize">completed</span>
                  <span className="w-5 h-5 flex items-center mt-0.5 justify-center rounded-full bg-gray-800/80">
                    {pendingCount.length}
                  </span>
                </div>
                <div className="text-xs absolute rounded-full bg-blue-700/50 h-14 w-24 md:h-16 md:w-28  justify-center items-start flex flex-col -right-11 top-12 md:top-16">
                  <span className="ms-1 md:ms-4 capitalize text-left">
                    AllTasks
                  </span>
                  <span className="w-5 h-5 flex items-center mt-0.5 ms-5 md:ms-7 justify-center rounded-full bg-gray-800/80">
                    {tasksCount}
                  </span>
                </div>
                <span>My Tasks</span>
                <p className="mt-1 text-xs sm:text-sm font-normal text-gray-400">
                  Stay organized, stay focused, get things done
                </p>
                <h3 className="text-center mt-4 border-t-2 pt-1 w-3/4 mx-auto underline">
                  Filters
                </h3>
                <div className="max-w-lg mx-auto flex justify-between mt-2">
                  <div>
                    <label htmlFor="selectDay" className="sr-only">
                      All Days
                    </label>
                    <select
                      id="selectDay"
                      onChange={(e) => setDayFilter(e.target.value)}
                      className="block pb-2.5 pe-4 ps-2 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-gray-400 border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-900 peer"
                    >
                      <option className="bg-gray-900" value="">
                        All Days
                      </option>
                      {days.map((day) => (
                        <option
                          key={day}
                          className="capitalize bg-gray-900"
                          value={day}
                        >
                          {day}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="selectPriority" className="sr-only">
                      All Prioritys
                    </label>
                    <select
                      id="selectPriority"
                      onChange={(e) => setPriorityFilter(e.target.value)}
                      className="block pb-2.5 pe-4 ps-2 w-full text-sm bg-transparent border-0 border-b-2  appearance-none text-gray-400 border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-900 peer"
                    >
                      <option className="bg-gray-900" value="">
                        All Prioritys
                      </option>
                      <option className="bg-gray-900" value="low">
                        Low
                      </option>
                      <option className="bg-gray-900" value="medium">
                        Medium
                      </option>
                      <option className="bg-gray-900" value="high">
                        High
                      </option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="selectCheck" className="sr-only">
                      All Tasks
                    </label>
                    <select
                      id="selectCheck"
                      onChange={(e) => {
                        let value = e.target.value;

                        if (value === "") {
                          setCheckFilter(undefined);
                        } else {
                          setCheckFilter(value === "true");
                        }
                      }}
                      className="block pb-2.5 pe-4 ps-2 w-full text-sm bg-transparent border-0 border-b-2  appearance-none text-gray-400 border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-900 peer"
                    >
                      <option className="bg-gray-900" value="">
                        All Tasks
                      </option>
                      <option className="bg-gray-900" value="true">
                        Pending
                      </option>
                      <option className="bg-gray-900" value="false">
                        Completed
                      </option>
                    </select>
                  </div>
                </div>
              </caption>
              <thead className="text-sm uppercase border-t-4 border-blue-800 bg-blue-950 text-blue-700">
                <tr>
                  <th scope="col" className="px-3 md:px-6 w-1/12 py-3"></th>
                  <th
                    scope="col"
                    className="px-3 md:px-6 w-5/12 sm:w-6/12 py-3"
                  >
                    Task Title
                  </th>
                  <th scope="col" className="px-3 md:px-6 w-1/12 py-3">
                    Day
                  </th>
                  <th
                    scope="col"
                    className="px-3 md:px-6 w-1/12 py-3 text-center"
                  >
                    Edit
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map((task) => (
                  <tr
                    key={task.id}
                    className="border-b bg-gray-800 border-gray-900 hover:bg-gray-900"
                  >
                    <td className="ms-3 md:ps-6 py-4">
                      <label className="cursor-pointer">
                        <input
                          onChange={() => {
                            if (!task.check) return;
                            setTaskId(task.id);
                            setOpenModalCheck(true);
                          }}
                          type="checkbox"
                          className="hidden peer"
                        />

                        {task.check ? (
                          <div className="flex items-center gap-2 ms-2 md:ms-0">
                            <div className="w-7 h-7 border-2 border-gray-500 rounded flex items-center justify-center transition"></div>

                            <span className="text-gray-500 capitalize pe-2 hidden sm:block">
                              pending
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 ms-2 md:ms-0">
                            <div className="w-7 h-7 border-2 border-green-500 rounded flex items-center justify-center bg-green-600/40 transition">
                              <i
                                className={`fa-solid fa-check w-3 h-3 text-green-400 block`}
                              ></i>
                            </div>

                            <span className="text-gray-500 capitalize hidden sm:block">
                              completed
                            </span>
                          </div>
                        )}
                      </label>
                    </td>
                    <th
                      scope="row"
                      className="px-2 ms-3 md:px-6 break-words text-white"
                    >
                      <span
                        className={`text-sm capitalize md:text-lg font-medium ${!task.check ? "line-through" : ""}`}
                      >
                        {task.taskTitle}
                      </span>
                      <p className="text-gray-500 text-xs font-normal">
                        Priority:
                        <span
                          className={`text-left ms-1 font-mono ${task.priority === "high" && "text-red-600"} ${task.priority === "medium" && "text-yellow-600"} ${task.priority === "low" && "text-green-600"}`}
                        >
                          {task.priority}
                        </span>
                      </p>
                    </th>
                    <td className="px-2 ms-3 md:px-6 py-4">{task.dueDate}</td>

                    <td className="px-2 md:px-6 py-3 text-right flex flex-row justify-evenly">
                      <label>
                        <input
                          onChange={() => {
                            if (!task.check) return;
                            setTaskId(task.id);
                            setOpenModalCheck(true);
                          }}
                          type="checkbox"
                          className="hidden peer"
                        />
                        {task.check ? (
                          <div className="bg-green-500/20 hover:text-white px-3 py-1.5 cursor-pointer rounded-lg text-green-400 hover:underline">
                            <i className="fa-solid fa-check"></i>
                          </div>
                        ) : (
                          <div className="px-3 py-1.5 cursor-default opacity-0">
                            <i className="fa-solid fa-check"></i>
                          </div>
                        )}
                      </label>
                      <button
                        className="border-2 border-red-700 hover:bg-red-700 bg-red-700/20 hover:text-white px-3 py-1 rounded-lg cursor-pointer text-red-700 hover:underline"
                        onClick={() => {
                          setOpenModalDelete(true);
                          setTaskId(task.id);
                        }}
                      >
                        <i className="fa-solid fa-trash-can w-3 h-3"></i>
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredTasks.length === 0 && (
                  <tr className=" border-b bg-gray-800 border-gray-800 hover:bg-gray-900">
                    <td
                      colSpan="4"
                      className="text-center text-xl font-semibold py-3"
                    >
                      No Tasks yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Modal Delete */}
      {openModalDelete && (
        <div
          onClick={() => setOpenModalDelete(false)}
          className="overflow-y-auto bg-gray-500/65 overflow-x-auto fixed top-0 right-0 left-0 bottom-0 z-50 justify-center items-center w-full md:inset-0 max-h-full"
        >
          <div className="relative p-4 top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md max-h-full">
            <div className="relative rounded-lg shadow-2xl shadow-blue-950 bg-blue-950">
              <button
                onClick={() => setOpenModalDelete(false)}
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-blue-900/70 hover:text-white"
              >
                <i className="fa-solid fa-xmark w-3 h-3"></i>

                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                <i className="fa-solid fa-exclamation mb-4 border-4 rounded-full w-14 h-14 p-1.5 text-3xl text-gray-200"></i>
                <h3 className="mb-5 text-lg font-normal text-gray-400">
                  Are you sure you want to delete this Task?
                </h3>
                <button
                  onClick={() => {
                    handleDelete(taskId);
                    setOpenModalDelete(false);
                  }}
                  className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  Yes, I'm sure
                </button>
                <button
                  onClick={() => setOpenModalDelete(false)}
                  className="py-2.5 px-5 ms-3 text-sm font-medium focus:outline-none rounded-lg border focus:z-10 focus:ring-4 focus:ring-blue-700 bg-blue-900 text-blue-400 border-blue-600 hover:text-white hover:bg-blue-700"
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Check */}
      {openModalCheck && (
        <div
          onClick={() => setOpenModalCheck(false)}
          className="overflow-y-auto bg-gray-500/65 overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-50 justify-center items-center w-full md:inset-0 max-h-full"
        >
          <div className="relative p-4 top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md max-h-full">
            <div className="relative rounded-lg shadow-2xl shadow-blue-950 bg-blue-950">
              <button
                onClick={() => setOpenModalCheck(false)}
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-blue-900/70 hover:text-white"
              >
                <i className="fa-solid fa-xmark w-3 h-3"></i>

                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                <i className="fa-classic fa-regular fa-circle-question mb-5 text-6xl text-gray-200"></i>
                <h3 className="mb-5 text-lg font-normal text-gray-400">
                  Have you finished this task ?
                </h3>
                <button
                  onClick={() => {
                    setOpenModalCheck(false);
                    handleCheck(taskId);
                  }}
                  className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  Yes, I finished it.
                </button>
                <button
                  onClick={() => setOpenModalCheck(false)}
                  className="py-2.5 px-5 ms-3 text-sm font-medium focus:outline-none rounded-lg border focus:z-10 focus:ring-4 focus:ring-red-700 bg-red-900 text-red-400 border-red-600 hover:text-white hover:bg-red-700"
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
