import { motion } from "framer-motion";

const Input = ({
  icon,
  id,
  name,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  ...props
}) => {
  return (
    <div className="space-y-1">
      <motion.div whileFocus={{ scale: 1.01 }} className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-400">{icon}</span>
        </div>
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`block w-full pl-10 pr-3 py-3 border ${
            error ? "border-red-300" : "border-gray-300"
          } rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
            error ? "focus:ring-red-500" : "focus:ring-indigo-500"
          } focus:border-transparent transition-all duration-200`}
          {...props}
        />
      </motion.div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-600"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default Input;
