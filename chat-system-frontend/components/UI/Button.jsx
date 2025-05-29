import { motion } from 'framer-motion';

const Button = ({ children, className = '', ...props }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${className} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;