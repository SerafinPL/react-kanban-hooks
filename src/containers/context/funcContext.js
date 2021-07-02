import React, { useState} from "react";

export const FuncContext = React.createContext({});

// eslint-disable-next-line
export default (props) => {

    const [lists, setLists] = useState([]);

    const addColumn = (name) => {
        const columns = [...lists];
        columns.push({ name: name, id: name + new Date().getTime(), tasks: [] });
        setLists([...columns]);
      };
    
      const removeColumn = (id) => {
        const columns = [...lists];
        const positionOfColumn = lists.findIndex((value) => id === value.id);
        columns.splice(positionOfColumn, 1);
        setLists([...columns]);
      };
    
      const addTask = (id, name) => {
        const positionOfColumn = lists.findIndex((value) => id === value.id);
        const columns = [...lists];
        const newTask = [...columns[positionOfColumn].tasks];
    
        newTask.push({
          name: name,
          id: name + new Date().getTime(),
          descripton: "",
        });
    
        columns[positionOfColumn].tasks = [...newTask];
        setLists([...columns]);
      };
    
      const removeTask = (idList, idTask) => {
        const positionOfColumn = lists.findIndex((value) => idList === value.id);
        const columns = [...lists];
        const positionOfTask = columns[positionOfColumn].tasks.findIndex(
          (value) => idTask === value.id
        );
        const newTask = [...columns[positionOfColumn].tasks];
    
        newTask.splice(positionOfTask, 1);
    
        columns[positionOfColumn].tasks = [...newTask];
        setLists([...columns]);
      };
    
      const editColumnName = (id, newName) => {
        const positionOfColumn = lists.findIndex((value) => id === value.id);
        const columns = [...lists];
        columns[positionOfColumn].name = newName;
        setLists([...columns]);
      };
    
      const editTask = (idList, newName, idTask, description) => {
        const positionOfColumn = lists.findIndex((value) => idList === value.id);
        const columns = [...lists];
        const positionOfTask = columns[positionOfColumn].tasks.findIndex(
          (value) => idTask === value.id
        );
        const newTask = [...columns[positionOfColumn].tasks];
    
        newTask[positionOfTask].name = newName;
        newTask[positionOfTask].description = description;
    
        columns[positionOfColumn].tasks = [...newTask];
        setLists([...columns]);
      };

  return (
    <FuncContext.Provider
      value={{
        addColumn: addColumn,  
        removeColumn: removeColumn,
        addTask: addTask,
        removeTask: removeTask,
        editColumnName: editColumnName,
        editTask: editTask,
        lists:lists, 
        setLists: setLists,
      }}
    >
        {props.children}
    </FuncContext.Provider>
  );
};
