import { useState } from 'react';
import './sidebar.scss';
import { motion } from 'framer-motion';
import MenuToggle from './MenuToggle';
import Links from './Links';

const variants = {
  open: {
    clipPath: `circle(2200px at 45px 45px)`,
    transition: {
      type: 'spring',
      stiffness: 20,
    },
  },
  closed: {
    clipPath: 'circle(30px at 45px 45px)',
    transition: {
      delay: 0.5,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
};

const SideBar = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <motion.div className="sidebar" animate={open ? 'open' : 'closed'}>
      <motion.div className="menu" variants={variants}>
        <Links />
      </motion.div>
      <MenuToggle setOpen={setOpen} />
    </motion.div>
  );
};

export default SideBar;
