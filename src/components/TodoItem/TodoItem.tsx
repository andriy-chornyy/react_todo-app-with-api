/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

type Props = {
  todo: Todo;
  handleDeleteTodo: (todoId: number) => void;
  deletingTodoId: number | null;
  onToggleCompleted: (id: number, title: string, completed: boolean) => void;
  todosIds: number[];

  handleTitleChange: (id: number, title: string, completed: boolean) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo: { title, completed, id },
  handleDeleteTodo,
  deletingTodoId,
  onToggleCompleted,
  todosIds,

  handleTitleChange,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const handleSubmit = () => {
    setIsEditing(false);
    if (editedTitle.trim() === title) {
      return;
    }

    if (!editedTitle.trim().length) {
      handleDeleteTodo(id);
    }

    handleTitleChange(id, editedTitle, completed);
  };

  const handleReset = () => {
    setEditedTitle(title);
    setIsEditing(false);
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleReset();
    }
  };

  return (
    <>
      {/* This is a completed todo */}
      <div data-cy="Todo" className={cn('todo', { completed })}>
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status loader"
            checked={completed}
            onChange={() => onToggleCompleted(id, title, completed)}
          />
        </label>

        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <input
              data-cy="TodoTitleField"
              type="text"
              value={editedTitle}
              placeholder={
                editedTitle.length === 0
                  ? 'Empty todo will be deleted'
                  : editedTitle
              }
              onChange={e => setEditedTitle(e.target.value)}
              className="todoapp__new-todo"
              onBlur={handleSubmit}
              onKeyUp={handleKeyUp}
              autoFocus
            />
          </form>
        ) : (
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setIsEditing(true)}
          >
            {/* Completed Todo */}
            {editedTitle}
          </span>
        )}

        {/* Remove button appears only on hover */}
        {!isEditing && (
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => handleDeleteTodo(id)}
          >
            ×
          </button>
        )}

        {/* overlay will cover the todo while it is being deleted or updated */}

        <div
          data-cy="TodoLoader"
          className={cn('modal overlay', {
            'is-active':
              id === 0 || id === deletingTodoId || todosIds.includes(id),
          })}
        >
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      </div>
    </>
  );
};
