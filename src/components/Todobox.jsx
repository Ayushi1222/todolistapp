import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaChevronDown, FaChevronUp, FaStar } from 'react-icons/fa';
import dummyData from './dummyData.json';
// Dummy JSON data
// const dummyData = [
//   { id: 1, heading: "Buy groceries", todo: "Get milk, eggs, and bread", isCompleted: false, isImportant: false, lastUpdated: "2024-07-30T10:00:00Z" },
//   { id: 2, heading: "Finish project", todo: "Complete the React assignment", isCompleted: false, isImportant: true, lastUpdated: "2024-07-29T15:30:00Z" },
//   { id: 3, heading: "Call mom", todo: "Wish her happy birthday", isCompleted: true, isImportant: false, lastUpdated: "2024-07-28T18:45:00Z" },
// ];

export default function Todobox() {
  const [todo, setTodo] = useState("");
  const [todoHeading, setTodoHeading] = useState("");
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedItems, setExpandedItems] = useState({});

  useEffect(() => {
    // Load data from dummy JSON
    setTodos(dummyData);
  }, []);

  const handleAdd = () => {
    const newTodo = {
      id: todos.length + 1,
      heading: todoHeading,
      todo: todo,
      isCompleted: false,
      isImportant: false,
      lastUpdated: new Date().toISOString()
    };
    setTodos([...todos, newTodo]);
    setTodo("");
    setTodoHeading("");
  };

  const handleEdit = (id) => {
    const editTodo = todos.find(item => item.id === id);
    setTodo(editTodo.todo);
    setTodoHeading(editTodo.heading);
    const newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
  };

  const handleDelete = (id) => {
    const newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleHeadingChange = (e) => {
    setTodoHeading(e.target.value);
  };

  const handleCheckBox = (id) => {
    const newTodos = todos.map(item => 
      item.id === id ? { ...item, isCompleted: !item.isCompleted, lastUpdated: new Date().toISOString() } : item
    );
    setTodos(newTodos);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleExpand = (id) => {
    setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleImportant = (id) => {
    const newTodos = todos.map(item => 
      item.id === id ? { ...item, isImportant: !item.isImportant, lastUpdated: new Date().toISOString() } : item
    );
    setTodos(newTodos);
  };

  // const filteredTodos = todos.filter(todo => {
  //   const matchesSearch = todo.heading.toLowerCase().includes(searchTerm.toLowerCase()) || 
  //                         todo.todo.toLowerCase().includes(searchTerm.toLowerCase());
  //   const matchesFilter = filter === "all" || 
  //                         (filter === "finished" && todo.isCompleted) || 
  //                         (filter === "notFinished" && !todo.isCompleted);
  //   return matchesSearch && matchesFilter;
  // });

  const sortTodos = (todos) => {
    return todos.sort((a, b) => {
      if (a.isImportant === b.isImportant) {
        // If both tasks have the same importance, sort by ID (assuming newer tasks have higher IDs)
        return b.id - a.id;
      }
      // Important tasks come first
      return a.isImportant ? -1 : 1;
    });
  };

  const filteredAndSortedTodos = sortTodos(
    todos.filter(todo => {
      const matchesSearch = todo.heading.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            todo.todo.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filter === "all" || 
                            (filter === "finished" && todo.isCompleted) || 
                            (filter === "notFinished" && !todo.isCompleted);
      return matchesSearch && matchesFilter;
    })
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-8">
      <div className="container mx-auto p-6 rounded-xl bg-white shadow-lg max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-blue-800">My Todo List</h1>
        
        <div className="mb-4 relative">
          <input 
            type="text" 
            placeholder="Search tasks..." 
            value={searchTerm}
            onChange={handleSearch}
            className="w-full p-2 pl-8 rounded-lg border-2 border-blue-200 focus:outline-none focus:border-blue-400"
          />
          <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <div className="mb-6">
          <h2 className='font-semibold text-xl mb-2 text-blue-700'>Add New Task</h2>
          <input 
            onChange={handleHeadingChange} 
            value={todoHeading} 
            type="text" 
            className='w-full rounded-lg p-2 border-2 border-blue-200 focus:outline-none focus:border-blue-400 mb-2' 
            placeholder="Enter task heading..."
          />
          <div className="flex">
            <input 
              onChange={handleChange} 
              value={todo} 
              type="text" 
              className='flex-grow rounded-l-lg p-2 border-2 border-blue-200 focus:outline-none focus:border-blue-400' 
              placeholder="Enter your task..."
            />
            <button 
              onClick={handleAdd} 
              disabled={todo.length < 1 || todoHeading.length < 1} 
              className='bg-blue-600 hover:bg-blue-700 p-2 text-white rounded-r-lg font-bold flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed'
            >
              <FaPlus className="mr-2" /> Add
            </button>
          </div>
        </div>

        <div className="mb-4 flex space-x-2">
          <button 
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg font-semibold ${filter === "all" ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Show All
          </button>
          <button 
            onClick={() => setFilter("finished")}
            className={`px-4 py-2 rounded-lg font-semibold ${filter === "finished" ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Show Finished
          </button>
          <button 
            onClick={() => setFilter("notFinished")}
            className={`px-4 py-2 rounded-lg font-semibold ${filter === "notFinished" ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Show Not Finished
          </button>
        </div>

        <div className="space-y-4">
          {filteredAndSortedTodos.length === 0 && <div className="text-gray-500 italic">No tasks found.</div>}
          {filteredAndSortedTodos.map((item) => (
            <div key={item.id} className="bg-blue-50 p-3 rounded-lg shadow">
              <div className="flex items-center mb-2">
                <input 
                  onChange={() => handleCheckBox(item.id)} 
                  type="checkbox" 
                  checked={item.isCompleted} 
                  className="mr-3"
                />
                <h3 className={`font-semibold flex-grow ${item.isCompleted ? "line-through text-gray-500" : "text-blue-800"}`}>
                  {item.heading}
                </h3>
                <button 
                  onClick={() => toggleImportant(item.id)} 
                  className={`mr-2 ${item.isImportant ? "text-yellow-500" : "text-gray-400"}`}
                >
                  <FaStar />
                </button>
                <button onClick={() => toggleExpand(item.id)}>
                  {expandedItems[item.id] ? <FaChevronUp /> : <FaChevronDown />}
                </button>
              </div>
              {expandedItems[item.id] && (
                <div className="mt-2 text-sm text-gray-600">
                  <p>{item.todo}</p>
                  <p className="mt-1">Last updated: {new Date(item.lastUpdated).toLocaleString()}</p>
                </div>
              )}
              <div className="flex items-center mt-2">
                <div className="flex-grow"></div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleEdit(item.id)} 
                    className='text-blue-600 hover:text-blue-800'
                  >
                    <FaEdit />
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id)} 
                    className='text-red-600 hover:text-red-800'
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}