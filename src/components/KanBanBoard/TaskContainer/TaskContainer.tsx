//Icons /styles
import './task.scss';
import { FaPen, FaTrash } from 'react-icons/fa6';

//Main imports + helpers
import { useEffect, useRef, useState } from 'react';
import { Task } from '../../../helpers/types';

//DndKit
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

//Framer motion
import { motion } from 'framer-motion';

interface Props {
  updateTask: (id: number, title: string, description: string) => void;
  deleteTask: (id: number) => void;
  task: Task;
}

const TaskContainer = ({ task, updateTask, deleteTask }: Props) => {
  const [edittingMode, setEdittingMode] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

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
    id: task.id,
    data: {
      type: 'Task',
      task: task,
    },
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (isDragging) {
    return <div ref={setNodeRef} style={style} className="dragging-task" />;
  }

  return (
    <motion.div
      className="task-card"
      ref={setNodeRef}
      style={style}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.3,
        ease: [0, 0.71, 0.2, 1.01],
        scale: { type: 'spring', damping: 5, stiffness: 100, restDelta: 0.001 },
      }}
    >
      <div className="task-top" {...attributes} {...listeners}>
        <motion.input
          className="group-title"
          type="text"
          ref={inputRef}
          value={task.title}
          onChange={(e) => {
            updateTask(task.id, e.target.value, task.description);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setEdittingMode(false);
            }
          }}
          disabled={!edittingMode}
          animate={{ opacity: edittingMode ? 0.7 : 1 }}
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
        <button
          className="delete-button"
          onClick={() => {
            deleteTask(task.id);
          }}
        >
          <FaTrash className="delete" size={15} />
        </button>
      </div>
      <div className="task-desc">
        <motion.textarea
          className="task-desc-area"
          onChange={(e) => {
            updateTask(task.id, task.title, e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setEdittingMode(false);
            }
          }}
          value={task.description}
          disabled={!edittingMode}
          animate={{ opacity: edittingMode ? 0.7 : 1 }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </motion.div>
  );
};

export default TaskContainer;
