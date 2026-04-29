import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    let interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <nav className="fixed left-0 right-0 top-0 bg-blue-950 z-50">
        <div className="container mx-auto px-1 md:px-4">
          <div className="nav-brand mt-2 flex justify-between items-center">
            <Link to="">
              <h1 className="text-white font-extrabold text-2xl lg:text-4xl">
                ToDo-App
              </h1>
            </Link>
            <ul className="flex justify-between  md:text-lg text-gray-400">
              <li className="px-1.5 lg:px-5 hover:text-blue-700 font-medium">
                <NavLink to="">Home</NavLink>
              </li>
              <li className="px-1.5 lg:px-5 hover:text-blue-700 font-medium">
                <NavLink to="addtask">AddTask</NavLink>
              </li>
              <li className="px-1.5 lg:px-5 hover:text-blue-700 font-medium">
                <NavLink to="todolist">TodoList</NavLink>
              </li>
            </ul>
          </div>
          <div className="nav-date flex justify-between text-gray-400 text-base md:text-xl font-semibold my-2 lg:my-3">
            <p>{time.toDateString()}</p>
            <p>{time.toLocaleTimeString()}</p>
          </div>
        </div>
      </nav>
    </>
  );
}
