import { useEffect, useMemo, useRef, useState } from 'react';
import { Group, Task } from '../../../helpers/types';

import './groupcontainer.scss';

import { motion } from 'framer-motion';

//DndKit
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FaPen, FaPlus } from 'react-icons/fa6';
import TaskContainer from '../TaskContainer/TaskContainer';

interface Props {
  group: Group;
  updateGroup: (id: number, title: string) => void;
  createTask: (groupId: number) => void;
  updateTask: (id: number, title: string, description: string) => void;
  deleteTask: (id: number) => void;
  tasks: Task[];
}

const GroupContainer = ({
  group,
  updateGroup,
  createTask,
  updateTask,
  deleteTask,
  tasks,
}: Props) => {
  const [edittingMode, setEdittingMode] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const tasksIds = useMemo(() => tasks.map((task) => task.id), [tasks]);

  useEffect(() => {
    if (edittingMode) {
      inputRef.current?.focus();
    }
  }, [edittingMode]);

  const {
    listeners,
    setNodeRef,
    attributes,
    isDragging,
    transform,
    transition,
  } = useSortable({
    id: group.id,
    data: {
      type: 'Group',
      group: group,
    },
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (isDragging) {
    return <div ref={setNodeRef} style={style} className="dragging-group" />;
  }

  return (
    <div ref={setNodeRef} style={style} className="group">
      <div {...attributes} {...listeners} className="group-top">
        <motion.input
          className="group-title"
          type="text"
          value={group.title}
          onChange={(e) => updateGroup(group.id, e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setEdittingMode(false);
            }
          }}
          disabled={!edittingMode}
          ref={inputRef}
          animate={{ opacity: edittingMode ? 1 : 0.5 }}
          transition={{ duration: 0.5 }}
        />
        <button
          className="edit-button"
          onClick={() => {
            setEdittingMode(!edittingMode);
          }}
        >
          <FaPen className="edit" size={15} />
        </button>
      </div>
      <div className="group-tasks">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskContainer
              key={task.id}
              task={task}
              updateTask={updateTask}
              deleteTask={deleteTask}
            />
          ))}
        </SortableContext>
      </div>
      <button
        className="button-add-task classic-button"
        onClick={() => {
          createTask(group.id);
        }}
      >
        <span>
          <FaPlus className="plus-icon" />
        </span>
      </button>
    </div>
  );
};

export default GroupContainer;
