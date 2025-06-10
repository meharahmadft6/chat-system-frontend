import { motion } from "framer-motion";

const Input = ({
  icon,
  id,
  name,
  type = "text", // default type is text
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  disabled = false, // added disabled prop
  className = "", // allow custom classes
  ...props
}) => {
  return (
    <div className={`space-y-1 ${className}`}>
      <motion.div
        whileFocus={{ scale: 1.01 }}
        whileHover={{ scale: 1.005 }}
        className="relative"
      >
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className={`${disabled ? "text-gray-300" : "text-gray-500"}`}>
              {icon}
            </span>
          </div>
        )}
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          className={`block w-full ${
            icon ? "pl-10" : "pl-3"
          } pr-3 py-3 border ${
            error ? "border-red-300" : "border-gray-300"
          } rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
            error ? "focus:ring-red-500" : "focus:ring-indigo-500"
          } focus:border-transparent transition-all duration-200 ${
            disabled ? "bg-gray-50 text-gray-400" : "bg-white text-gray-800"
          } placeholder-gray-400`}
          {...props}
        />
      </motion.div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="text-sm text-red-600"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default Input;
