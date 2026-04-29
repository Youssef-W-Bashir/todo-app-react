import style from "./Home.module.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <section>
        <div className="container mx-auto flex flex-col justify-center items-center h-[77.8vh]">
          <h2
            className={`text-center text-blue-800 ${style.textShadow} font-bold text-7xl tracking-wide scale-y-150`}
          >
            TO DO
          </h2>
          <Link to="addtask">
            <p className="italic underline text-xl mt-5 text-blue-700">
              Record All Your Tasks
            </p>
          </Link>
        </div>
      </section>
    </>
  );
}
