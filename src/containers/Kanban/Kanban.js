import React, { useState, useContext, useEffect } from "react";
import classes from "./Kanban.module.css";
import ExistingColumn from "../../components/Column/ExistingColumn/ExistingColumn";
import NewColumn from "../../components/Column/NewColumn/NewColumn";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { FullContext } from "../context/context";
import { FuncContext } from "../context/funcContext";

import useData from "../ownHook/data";



const onDragEnd = (result, lists, setLists) => {
  const { source, destination, type } = result;

  if (destination) {
    if (type === "task") {
      if (source.droppableId === destination.droppableId) {
        // ta sama kolumna
        const indexOfColumn = lists.findIndex(
          (value) => value.id === source.droppableId
        );
        const columns = [...lists];
        const tasks = [...columns[indexOfColumn].tasks];

        const [removed] = tasks.splice(source.index, 1);
        tasks.splice(destination.index, 0, removed);

        columns[indexOfColumn].tasks = [...tasks];
        setLists([...columns]);
      } else {
        // inna kolumna
        const indexSourceColumn = lists.findIndex(
          (value) => value.id === source.droppableId
        );
        const indexDestColumn = lists.findIndex(
          (value) => value.id === destination.droppableId
        );
        const columns = [...lists];

        const sourceTasks = [...columns[indexSourceColumn].tasks];
        const destTasks = [...columns[indexDestColumn].tasks];

        const [removed] = sourceTasks.splice(source.index, 1);
        destTasks.splice(destination.index, 0, removed);

        columns[indexSourceColumn].tasks = [...sourceTasks];
        columns[indexDestColumn].tasks = [...destTasks];
        setLists([...columns]);
      }
    } else {
      // type === 'column'

      const columns = [...lists];
      const [movedColumn] = columns.splice(source.index, 1);
      columns.splice(destination.index, 0, movedColumn);

      setLists([...columns]);

      return;
    }
  } else {
    //if (destination)
    return;
  }
};

const Kanban = () => {

  const context = useContext(FullContext);
  const funcContext = useContext(FuncContext);

  const [fetched, setFetched] = useState(false);

  const {
    saveData,
    fatchData,
    sending,
    errorSend,
    responseSend,
    fatching,
    errorFatch,
    responseFatch,
  } = useData();

  useEffect(() => {
    if (context.isAuth) {
      if (!fetched) {
        saveData(context.userId, funcContext.lists, context.token, context.option);
      }
      setFetched(false);
    }
    // eslint-disable-next-line
  }, [funcContext.lists]);

  useEffect(() => {
    if (context.isAuth && context.token) {
      fatchData(context.userId, context.token, context.option);
      console.log('KABAN FETCH EFFECT')
    }
  }, [context.isAuth, context.userId, context.token, fatchData]);

  useEffect(() => {
    if (responseFatch) {
      if (responseFatch.data) {
        setFetched(true);
        const data = [...responseFatch.data];
        data.map((value) => {
          if (!value.tasks) {
            value.tasks = [];
          }
          return false;
        });

        funcContext.setLists(data);
      }
    }
  }, [responseFatch]);

  return (
    <div className={classes.mainBox}>
      {context.isAuth && (
        <React.Fragment>
          <DragDropContext
            onDragEnd={(result) =>
              onDragEnd(result, funcContext.lists, funcContext.setLists)
            }
          >
            <Droppable droppableId="main" type="column" direction="horizontal">
              {(provided, snapshot) => {
                return (
                  <div
                    className={classes.kanban}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={
                      {
                        //backgroundColor: snapshot.isDraggingOver ? '#F9F3E6;' : '#F9F3E6;',
                        //paddingBottom: snapshot.isDraggingOver ? '25%' : '0px'
                      }
                    }
                  >
                    {funcContext.lists.map((list, index) => (
                      <Draggable
                        key={list.id}
                        draggableId={list.id}
                        index={index}
                      >
                        {(provided, snapshot) => {
                          return (
                            <div
                              className={classes.column}
                              {...provided.draggableProps}
                              ref={provided.innerRef}
                              style={{
                                ...provided.draggableProps.style,
                                userSelect: "none",
                                backgroundColor: snapshot.isDragging
                                  ? "#fba883"
                                  : "#EA9772",
                              }}
                            >
                              <ExistingColumn
                                dragHandleProps={provided.dragHandleProps}
                                key={list.id}
                                identy={list.id}
                                name={list.name}
                                tasks={list.tasks}
                              />
                            </div>
                          );
                        }}
                      </Draggable>
                    ))}

                    {provided.placeholder}
                    <div className={classes.columnAdd}>
                      <div className={classes.itemNew}>
                        <NewColumn add={funcContext.addColumn} />
                      </div>
                    </div>
                  </div>
                );
              }}
            </Droppable>
          </DragDropContext>
        </React.Fragment>
      )}
      {context.isAuth && (
        <div className={classes.infoBox}>
          {sending && "Zapisuje zmiany..."}
          {responseSend && "Zapisano zmiany"}
          {errorSend && (
            <span style={{ color: "red" }}>'Zmian nie udało się zapisać!'</span>
          )}
          {fatching && "Pobieram Dane..."}
          {responseFatch && "Dane Pobrane"}
          {errorFatch && "Danych nie udało się pobrać"}
        </div>
      )}
    </div>
  );
};

export default React.memo(Kanban);
