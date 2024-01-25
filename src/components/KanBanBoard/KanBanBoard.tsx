//styles imports
import './kanban.scss';
import { FaPlus, FaTrash } from 'react-icons/fa6';

//Main imports
import { useState, useEffect, useMemo } from 'react';
import GroupContainer from './Group/GroupContainer';
import { createPortal } from 'react-dom';
//DndKit
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

import { SortableContext, arrayMove } from '@dnd-kit/sortable';

//Helpers and Notifications
import { fetchData } from '../../helpers/fetchData';
import { Group, Task } from '../../helpers/types';
import {
  createNewGroup,
  createNewTask,
  deleteGroup,
  updateGroupList,
  updateTaskList,
} from '../../helpers/crud';
import { toast } from 'react-toastify';

import TaskContainer from './TaskContainer/TaskContainer';
const KanBanBoard = () => {
  const existingGroups = fetchData('storageGroups') as Group[];
  const exisitngTasks = fetchData('storageTasks') as Task[];

  const [groups, setGroups] = useState<Group[]>(existingGroups);
  const [tasks, setTasks] = useState<Task[]>(exisitngTasks);

  const [draggingGroup, setDraggingGroup] = useState<Group | null>(null);
  const [draggingTask, setDraggingTask] = useState<Task | null>(null);

  useEffect(() => {
    updateGroupList(groups);
    updateTaskList(tasks);
  }, [groups, tasks]);

  const groupsId = useMemo(() => groups.map((group) => group.id), [groups]);

  //Tasks creation

  const createNewTaskHandler = async (groupId: number) => {
    const newTask = await createNewTask(groupId);
    setTasks((tasks) => [...tasks, newTask as Task]);
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
    toast.error(`${tasks.find((task) => task.id === id)?.title} deleted`);
  };

  //Sensors form DndKit

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  );

  //Dragging Functions
  const onDraggingStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === 'Group') {
      setDraggingGroup(event.active.data.current.group);
      return;
    }
    if (event.active.data.current?.type === 'Task') {
      setDraggingTask(event.active.data.current.task);
      return;
    }
  };

  const onDraggingEnd = (event: DragEndEvent) => {
    setDraggingGroup(null);
    setDraggingTask(null);

    const { active, over } = event;
    if (!over) {
      return;
    }

    const activeId = active.id;
    const overId = over.id;

    const isDraggingGroup = active.data.current?.type === 'Group';
    if (!isDraggingGroup) {
      return;
    }

    if (activeId !== overId) {
      setGroups((groups) => {
        const activeGroupIndex = groups.findIndex(
          (group) => group.id === activeId
        );
        const overGroupIndex = groups.findIndex((group) => group.id === overId);

        return arrayMove(groups, activeGroupIndex, overGroupIndex);
      });
    }
  };

  const onDraggingOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) {
      return;
    }
    const activeId = active.id;
    const overId = over.id;

    if (activeId !== overId) {
      const isActiveTask = active.data.current?.type === 'Task';
      const isOverTask = over.data.current?.type === 'Task';

      if (isActiveTask && isOverTask) {
        setTasks((tasks) => {
          const activeTaskIndex = tasks.findIndex(
            (task) => task.id === activeId
          );
          const overTaskIndex = tasks.findIndex((task) => task.id === overId);

          if (tasks[activeTaskIndex].groupId !== tasks[overTaskIndex].groupId) {
            tasks[activeTaskIndex].groupId = tasks[overTaskIndex].groupId;
            return arrayMove(tasks, activeTaskIndex, overTaskIndex - 1);
          }
          return arrayMove(tasks, activeTaskIndex, overTaskIndex);
        });
      }

      const isOverGroup = over.data.current?.type === 'Group';

      if (isActiveTask && isOverGroup) {
        setTasks((tasks) => {
          const activeIndex = tasks.findIndex((task) => task.id === activeId);

          tasks[activeIndex].groupId = Number(overId);
          return arrayMove(tasks, activeIndex, activeIndex);
        });
      }
    }
  };

  const handleUpdateGroup = (id: number, title: string) => {
    setGroups((groups) =>
      groups.map((group) => {
        if (group.id === id) {
          return { ...group, title };
        }
        return group;
      })
    );
  };
  const handleUpdateTask = (id: number, title: string, description: string) => {
    setTasks((tasks) =>
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, title, description };
        }
        return task;
      })
    );
  };

  return (
    <div className="kanban-section">
      <DndContext
        sensors={sensors}
        onDragStart={onDraggingStart}
        onDragEnd={onDraggingEnd}
        onDragOver={onDraggingOver}
      >
        <div className="groups">
          <div className="groups-wrapper">
            <SortableContext items={groupsId}>
              {groups.map((group) => (
                <div className="group-col" key={group.id}>
                  <button
                    className="button-delete-group"
                    onClick={() => {
                      deleteGroup(group.id);
                      setGroups(groups.filter((g) => g.id !== group.id));
                    }}
                  >
                    <FaTrash className="thrash-icon" size={20} />
                  </button>
                  <GroupContainer
                    key={group.id}
                    group={group}
                    updateGroup={handleUpdateGroup}
                    createTask={createNewTaskHandler}
                    updateTask={handleUpdateTask}
                    deleteTask={handleDeleteTask}
                    tasks={tasks.filter((task) => task.groupId === group.id)}
                  />
                </div>
              ))}
            </SortableContext>
          </div>

          <button
            onClick={async () => {
              const newGroup = await createNewGroup();
              setGroups((groups) => [...groups, newGroup as Group]);
            }}
            className="classic-button button-add-group"
          >
            <FaPlus size={20} />
          </button>
        </div>

        {createPortal(
          <DragOverlay>
            {draggingGroup && (
              <GroupContainer
                group={draggingGroup}
                updateGroup={handleUpdateGroup}
                updateTask={handleUpdateTask}
                createTask={createNewTaskHandler}
                deleteTask={handleDeleteTask}
                tasks={tasks.filter(
                  (task) => task.groupId === draggingGroup.id
                )}
              />
            )}
            {draggingTask && (
              <TaskContainer
                updateTask={handleUpdateTask}
                deleteTask={handleDeleteTask}
                task={draggingTask}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
};

export default KanBanBoard;
