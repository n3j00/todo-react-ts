import KanBanBoard from '../../components/KanBanBoard/KanBanBoard';
import StartUp from '../../components/StartUp/StartUp';
import { fetchData } from '../../helpers/fetchData';

import './todo.scss';

const ToDo = () => {
  const username = fetchData('username') as string;

  return (
    <div className="todo-page">{username ? <KanBanBoard /> : <StartUp />}</div>
  );
};

export default ToDo;
