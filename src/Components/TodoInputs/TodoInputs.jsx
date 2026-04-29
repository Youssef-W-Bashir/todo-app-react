import style from "./TodoInputs.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useOutletContext } from "react-router-dom";

export default function TodoInputs() {
  let { addTask, message, days } = useOutletContext();

  let validationSchema = Yup.object().shape({
    taskTitle: Yup.string()
      .min(4, "minimum length 4 Ex.'play'")
      .required("Task title is required"),
    dueDate: Yup.string().required("Please select a day"),
    priority: Yup.string().required("Please select a priority"),
  });

  function handleForm(values) {
    addTask({
      id: Date.now(),
      taskTitle: values.taskTitle,
      dueDate: values.dueDate,
      priority: values.priority,
      check: true,
    });
  }

  let formik = useFormik({
    initialValues: {
      taskTitle: "",
      dueDate: "",
      priority: "",
      check: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      handleForm(values);
      resetForm();
    },
  });

  return (
    <>
      <section className="relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col justify-center items-center h-[78vh] md:h-[77.7vh]">
            <h2 className="capitalize underline text-3xl w-full md:w-[58%] lg:w-[30%] mb-3 md:mb-7 font-bold scale-y-125 text-blue-800">
              add task
            </h2>
            <form
              onSubmit={formik.handleSubmit}
              method="get"
              className="bg-gray-800 text-white shadow-lg rounded-2xl p-6 w-full max-w-md space-y-4"
            >
              <h3 className="text-xl font-semibold text-center">
                Add New Task
              </h3>

              <div>
                <label
                  htmlFor="taskTitle"
                  className="block mb-1 text-sm font-medium"
                >
                  Task Title
                </label>
                <input
                  id="taskTitle"
                  name="taskTitle"
                  value={formik.values.taskTitle}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="text"
                  placeholder="Enter your task..."
                  className="w-full border-2 rounded-lg p-2 bg-gray-900 outline-none focus:ring-2 focus:ring-white"
                />
                {formik.errors.taskTitle && formik.touched.taskTitle ? (
                  <div
                    className="p-2 text-sm font-medium text-red-600 rounded-2xl bg-red-600/35"
                    role="alert"
                  >
                    {formik.errors.taskTitle}
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div>
                <label
                  htmlFor="dueDate"
                  className="block mb-1 text-sm font-medium"
                >
                  Date
                </label>
                <select
                  id="dueDate"
                  name="dueDate"
                  value={formik.values.dueDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border-2 rounded-lg p-2 outline-none focus:ring-2 bg-gray-900 focus:ring-white"
                >
                  <option value="" disabled>
                    Days
                  </option>
                  {days.map((day) => (
                    <option key={day} className="capitalize" value={day}>
                      {day}
                    </option>
                  ))}
                </select>
                {formik.errors.dueDate && formik.touched.dueDate ? (
                  <div
                    className="p-2 mb-4 text-sm font-medium text-red-600 rounded-2xl bg-red-600/35"
                    role="alert"
                  >
                    {formik.errors.dueDate}
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div>
                <label
                  htmlFor="priority"
                  className="block mb-1 text-sm font-medium"
                >
                  Priority
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={formik.values.priority}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border-2 rounded-lg p-2 outline-none focus:ring-2 bg-gray-900 focus:ring-white"
                >
                  <option value="" disabled>
                    Priority level
                  </option>
                  <option value="low">Low 🟢</option>
                  <option value="medium">Medium 🟡</option>
                  <option value="high">High 🔴</option>
                </select>
                {formik.errors.priority && formik.touched.priority ? (
                  <div
                    className="p-2 mb-4 text-sm font-medium text-red-600 rounded-2xl bg-red-600/35"
                    role="alert"
                  >
                    {formik.errors.priority}
                  </div>
                ) : (
                  ""
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-900 transition"
              >
                Add Task
              </button>
              {message && (
                <div
                  className={`${style.messageSuccess} mt-4 px-8 py-4 w-fit bg-green-500/30 text-green-500 p-3 rounded`}
                >
                  {message}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
