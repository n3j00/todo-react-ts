import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const Links = () => {
  interface IItems {
    name: string;
    path: string;
  }

  const items: IItems[] = [
    { name: 'Home', path: '/todo-react-ts/' },
    { name: 'Todo', path: '/todo-react-ts/todo' },
  ];
  return (
    <motion.div className="links" variants={variants}>
      {items.map((item) => (
        <NavLink to={item.path} key={item.name} className="link">
          {item.name}
        </NavLink>
      ))}
      <a href="https://nejoo.xyz" className="link">
        About creator
      </a>
    </motion.div>
  );
};

export default Links;
