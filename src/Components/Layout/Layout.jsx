import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

export default function Layout() {
  let days = [
    "saturday",
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
  ];

  const [tasks, setTasks] = useState(() => {
    let storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  let addTask = (task) => {
    setTasks([...tasks, task]);

    setMessage("Task added Successfully!");

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  return (
    <>
      <Navbar />
      <div className="mt-20 md:pt-4 flex-1">
        <Outlet context={{ tasks, message, days, addTask, setTasks }}></Outlet>
      </div>
      <Footer />
    </>
  );
}
