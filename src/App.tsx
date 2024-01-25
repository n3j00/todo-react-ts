//Main imports
import 'react-toastify/dist/ReactToastify.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout';

//Pages

import Home from './pages/Home/Home';
import ToDo from './pages/ToDo/ToDo';

// Loaders

import { ToastContainer } from 'react-toastify';

const router = createBrowserRouter([
  {
    path: '/todo-react-ts/',
    element: <Layout />,
    errorElement: <div>Not Found</div>,
    children: [
      {
        path: '/todo-react-ts/',
        element: <Home />,
        errorElement: <div>Not Found</div>,
      },
      {
        path: '/todo-react-ts/todo',
        element: <ToDo />,
        errorElement: <div></div>,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop={true}
        theme="dark"
      />
    </>
  );
}

export default App;
