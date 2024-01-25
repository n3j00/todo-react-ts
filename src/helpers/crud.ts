import { toast } from 'react-toastify';
import { Group, Task } from './types';
import { fetchData } from './fetchData';

// User actions

export const createUser = async (username: string) => {
  try {
    localStorage.setItem('username', JSON.stringify(username));
    localStorage.setItem('storageGroups', JSON.stringify([]));
    localStorage.setItem('storageTasks', JSON.stringify([]));
    return console.log('User created successfully');
  } catch (err) {
    console.error(err);
  }
};

export const deleteUser = async () => {
  try {
    localStorage.removeItem('username');
    localStorage.removeItem('storageGroups');
    localStorage.removeItem('storageTasks');

    return console.log('User deleted successfully');
  } catch (err) {
    throw new Error('Something went wrong!');
  }
};

//KanBan actions

export const generateRandomId = () => {
  return Math.floor(Math.random() * 1000000);
};

export const generateRandomTitle = (option: string) => {
  if (option === 'group') {
    const titles = [
      'Shopping',
      'Work',
      'School',
      'Home',
      'Family',
      'Friends',
      'Sport',
      'Hobby',
      'Health',
      'Travel',
      'Entertainment',
      'Other',
    ];
    const randomIndex = Math.floor(Math.random() * titles.length);
    return titles[randomIndex];
  } else if (option === 'task') {
    const titles = [
      'Buy milk',
      'Buy bread',
      'Buy eggs',
      'Buy cheese',
      'Buy butter',
      'Buy ham',
      'Buy bacon',
      'Buy sausages',
      'Buy chicken',
      'Buy beef',
      'Buy pork',
      'Buy fish',
      'Buy pasta',
      'Buy rice',
      'Buy potatoes',
      'Buy onions',
      'Buy tomatoes',
      'Buy carrots',
      'Buy broccoli',
      'Buy cauliflower',
      'Buy peppers',
    ];
    const randomIndex = Math.floor(Math.random() * titles.length);
    return titles[randomIndex];
  }
};

export const genereteRandomDescription = () => {
  const descriptions = [
    'lorem ipsum dolor sit amet',
    'consectetur adipiscing elit',
    'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    'Ut enim ad minim veniam',
    'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
    'Excepteur sint occaecat cupidatat non proident',
    'sunt in culpa qui officia deserunt mollit anim id est laborum',
  ];
  const randomIndex = Math.floor(Math.random() * descriptions.length);
  return descriptions[randomIndex];
};

//Groups actions
export const updateGroupList = (groups: Group[]) => {
  try {
    localStorage.setItem('storageGroups', JSON.stringify([...groups]));
    return;
  } catch (err) {
    return toast.error(`Error: ${err} `);
  }
};

export const createNewGroup = async () => {
  const groupToAdd: Group = {
    id: generateRandomId(),
    title: generateRandomTitle('group') || '',
  };
  const exisitngGroups = fetchData('storageGroups');

  try {
    localStorage.setItem(
      'storageGroups',
      JSON.stringify([...exisitngGroups, groupToAdd])
    );
    toast.success('Your group has been created');
    return groupToAdd;
  } catch (err) {
    return toast.error(`Error: ${err} `);
  }
};

export const deleteGroup = (id: number) => {
  const exisitngGroups = fetchData('storageGroups');
  const groupToRemove = exisitngGroups.findIndex(
    (group: Group) => group.id === id
  );

  if (groupToRemove !== -1) {
    try {
      const groupTitle = exisitngGroups[groupToRemove].title;
      exisitngGroups.splice(groupToRemove, 1);
      localStorage.setItem('storageGroups', JSON.stringify(exisitngGroups));
      toast.error(`Group "${groupTitle}" deleted successfully ! `);
      return groupToRemove.id;
    } catch (err) {
      return toast.error(`Error: ${err} `);
    }
  }
};

export const updateGroup = (id: number, title: string) => {
  const exisitngGroups = fetchData('storageGroups');
  const groupToUpdate = exisitngGroups.findIndex(
    (group: Group) => group.id === id
  );

  if (groupToUpdate !== -1) {
    try {
      exisitngGroups[groupToUpdate].title = title;
      localStorage.setItem('storageGroups', JSON.stringify(exisitngGroups));
      return toast.success(`Todo updated successfully ! `);
    } catch (err) {
      return toast.error(`Error: ${err} `);
    }
  }
};

//Tasks actions

export const createNewTask = async (groupId: number) => {
  const taskToAdd: Task = {
    id: generateRandomId(),
    groupId: groupId,
    title: generateRandomTitle('task') || '',
    description: genereteRandomDescription(),
  };
  const existingTasks = fetchData('storageTasks');
  try {
    localStorage.setItem(
      'storageTasks',
      JSON.stringify([...existingTasks, taskToAdd])
    );
    toast.success('Your task has been created');
    return taskToAdd;
  } catch (err) {
    return toast.error(`Error: ${err} `);
  }
};

export const updateTaskList = (tasks: Task[]) => {
  try {
    localStorage.setItem('storageTasks', JSON.stringify([...tasks]));
    return;
  } catch (err) {
    return toast.error(`Error: ${err} `);
  }
};
