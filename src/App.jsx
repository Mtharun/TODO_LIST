import { useState,useEffect } from "react";
import "./App.css";

const completed = "Completed";
const notCompleted = "NotCompleted";
function App() {
  const initialData = [
    {
      id: 1,
      Name: "office Task - 1",
      Description: "this is the description for My first Task",
      status: "Not Completed",
    },
    {
      id: 2,
      Name: "office Task - 2",
      Description: "this is the description for My Second Task",
      status: "Completed",
    },
    {
      id: 3,
      Name: "office Task - 3",
      Description: "this is the description for My Third Task",
      status: "Not Completed",
    },
  ];
  // eslint-disable-next-line no-unused-vars
  // const [count, setCount] = useState(data);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const [tasks, setTasks] = useState(initialData);
  const [newTask, setNewTask] = useState({
    Name: "",
    Description: "",
    status: "Not Completed",
  });
  const [isEditId, setEditId] = useState(null);
  const [applyFilter, setApplyFilter] = useState(tasks);
  const [filterType, setFilterType] = useState("ALL");

  useEffect(()=>{
    filterAppliedFun(filterType)
    
  },[tasks])
  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleAddTodo = () => {
    if (isEditId != null) {
      const tempArry = [];
      tasks.map((data) => {
        if (data.id === isEditId) {
          tempArry.push({
            ...data,
            Name: newTask.Name,
            Description: newTask.Description,
          });
        } else {
          tempArry.push(data);
        }
      });
      setTasks(tempArry);
      setNewTask({
        Name: "",
        Description: "",
        status: "Not Completed",
      });
      setEditId(null);
    } else {
      setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
      setNewTask({ Name: "", Description: "", status: "Not Completed" });
    }
  };

  const handleEditTodo = (id) => {
    setEditId(id);
    const [updateId] = tasks.filter((data) => data.id === id);
    console.log(updateId, "updateId");
    if (updateId) {
      setNewTask(updateId);
    }
  };

  const handleDeleteTodo = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleStatusChange = (id, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };
  const updateCompletedorNot = (data, name) => {
    const tempArry = [];
    tasks.map((ele) => {
      if (data.id === ele.id) {
        tempArry.push({
          ...data,
          status: name,
        });
      } else {
        tempArry.push(ele);
      }
    });

    setTasks(tempArry);
  };
  const filterAppliedFun = (type) => {
    if (type === "Completed" || type === "Not Completed") {
      const data = tasks.filter((data) => data.status === type);
      console.log(data, "datadatadatadatadata", tasks, type);
      setApplyFilter(data);
    } else {
      setApplyFilter(tasks);
    }
  };
  return (
    <div className="container bg-white text-black h-screen ">
      <div className="flex justify-center ">
        <a className="btn btn-ghost normal-case text-success text-xl">
          My Todo
        </a>
      </div>

      <div className="flex justify-center gap-5 my-2">
        <input
          type="text"
          placeholder="Todo Name"
          className="input bg-white input-bordered input-success w-96"
          name="Name"
          value={newTask.Name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Todo Description"
          className="input  bg-white input-bordered input-success w-96"
          name="Description"
          value={newTask.Description}
          onChange={handleInputChange}
        />
        <button
          className="btn bg-[#14AC89] text-center text-white px-20"
          onClick={handleAddTodo}
        >
          {isEditId != null ? "Update Todo" : "Add Todo"}
        </button>
      </div>

      <div className="navbar">
        <div className="navbar mx-12">
          <div className="flex-1">
            <a className="btn btn-ghost normal-case text-xl">My Todo</a>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal text-xl px-1">
              <li>
                <a>
                  <b>Status Filter : </b>
                </a>
              </li>
              <li>
                <select
                value={filterType}
                  className={classNames(
                    applyFilter == "ALL" ? "bg-[#14AC89]" : "bg-error",
                    "select select-bordered w-36 text-white"
                  )}
                >
                  <option onClick={() => {filterAppliedFun("ALL")
              setFilterType("ALL")
                }}>ALL</option>
                  <option onClick={() => {filterAppliedFun("Completed")
                  setFilterType("Completed")
                }}>
                    Completed
                  </option>
                  <option onClick={() => {filterAppliedFun("Not Completed")
                  setFilterType("Not Completed")}}>
                    Not Completed
                  </option>
                </select>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 px-20">
        {applyFilter && applyFilter.length > 0 ? (
          <>
            {applyFilter?.map((ele, idx) => (
              <div
                key={idx}
                className="card w-[430px] bg-success bg-opacity-25 shadow-xl"
              >
                <div className="card-body">
                  <p>Name : {ele.Name}</p>
                  <p className="whitespace-nowrap">
                    Description : {ele.Description}
                  </p>
                  <label>
                    Status{" "}
                    <select
                      value={ele.status}
                      className={classNames(
                        ele.status == "Completed" ? "bg-[#14AC89]" : "bg-error",
                        "select select-bordered select-sm w-36 max-w-xs text-white"
                      )}
                    >
                      <option
                        onClick={() => updateCompletedorNot(ele, "Completed")}
                      >
                        Completed
                      </option>
                      <option
                        onClick={() =>
                          updateCompletedorNot(ele, "Not Completed")
                        }
                      >
                        Not Completed
                      </option>
                    </select>
                  </label>
                  <div className="card-actions justify-end">
                    <div className="card-actions justify-end">
                      <button
                        className="btn text-white bg-[#14AC89]"
                        onClick={() => handleEditTodo(ele.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn text-white bg-[#D05E1F]"
                        onClick={() => handleDeleteTodo(ele.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="flex items-center justify-center">
            <p>No Data Found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
