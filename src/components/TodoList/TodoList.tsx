import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  allTodos: Todo[];
  tempTodo: Todo | null;
  handleDeleteTodo: (todoId: number) => void;
  deletingTodoId: number | null;
  onToggleCompleted: (id: number, title: string, completed: boolean) => void;
  todosIds: number[];

  handleTitleChange: (id: number, title: string, completed: boolean) => void;
};

export const TodoList: React.FC<Props> = ({
  allTodos,
  tempTodo,
  handleDeleteTodo,
  deletingTodoId,
  onToggleCompleted,
  todosIds,

  handleTitleChange,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {allTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleDeleteTodo={handleDeleteTodo}
          deletingTodoId={deletingTodoId}
          onToggleCompleted={onToggleCompleted}
          todosIds={todosIds}

          handleTitleChange={handleTitleChange}
        />
      ))}
      {tempTodo && (
        <TodoItem
          key={tempTodo.id}
          todo={tempTodo}
          handleDeleteTodo={handleDeleteTodo}
          deletingTodoId={deletingTodoId}
          onToggleCompleted={onToggleCompleted}
          todosIds={todosIds}

          handleTitleChange={handleTitleChange}
        />
      )}
    </section>
  );
};
