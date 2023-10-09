"use client";

import { useBoardStore } from "@/store/BoardStore";
import { useEffect } from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import Column from "./Column";

const Dashboard = () => {
  const [board, getBoard, setBoardState, updateTodoInDb] = useBoardStore(
    (state) => [
      state.board,
      state.getBoard,
      state.setBoardState,
      state.updateTodoInDb,
    ]
  );

  useEffect(() => {
    getBoard();
  }, [getBoard]);

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;
    if (!destination) return;
    if (type === "column") {
      const entries = Array.from(board.columns.entries());
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);
      const rearrangedColumns = new Map(entries);
      setBoardState({
        ...board,
        columns: rearrangedColumns,
      });
    }
    if (type === "card") {
      const columns = Array.from(board.columns);
      const startColIndex = columns[Number(source.droppableId)];
      const finishColIndex = columns[Number(destination.droppableId)];
      const startCol: Column = {
        id: startColIndex[0],
        todos: startColIndex[1].todos,
      };
      const finishCol: Column = {
        id: finishColIndex[0],
        todos: finishColIndex[1].todos,
      };
      if (!startCol || !finishCol) return;
      if (source.index === destination.index && startCol === finishCol) return;

      const newTodos = startCol.todos;
      const [todoMoved] = newTodos.splice(source.index, 1);
      if (startCol.id === finishCol.id) {
        newTodos.splice(destination.index, 0, todoMoved);
        const newCol: Column = {
          id: startCol.id,
          todos: newTodos,
        };
        const newColumns = new Map(board.columns);
        newColumns.set(startCol.id, newCol);
        setBoardState({
          ...board,
          columns: newColumns,
        });
      } else {
        const finishTodos = Array.from(finishCol.todos);
        finishTodos.splice(destination.index, 0, todoMoved);
        const newColumns = new Map(board.columns);
        const newCol: Column = {
          id: startCol.id,
          todos: newTodos,
        };

        newColumns.set(startCol.id, newCol);
        newColumns.set(finishCol.id, {
          id: finishCol.id,
          todos: finishTodos,
        });
        setBoardState({
          ...board,
          columns: newColumns,
        });
        updateTodoInDb(todoMoved, finishCol.id);
      }
    }
  };

  return (
    <div className="flex-1 w-full p-2">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="board" direction="horizontal" type="column">
          {(provided) => (
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {Array.from(board.columns.entries()).map(
                ([id, column], index) => (
                  <Column
                    key={column.id}
                    id={column.id}
                    todos={column.todos}
                    index={index}
                  />
                )
              )}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Dashboard;
