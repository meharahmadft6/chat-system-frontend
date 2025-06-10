const ProgressBar = ({ progress, color = "indigo" }) => {
  const colorClasses = {
    indigo: "bg-indigo-600",
    purple: "bg-purple-600",
    blue: "bg-blue-600",
    white: "bg-white",
  };

  return (
    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
      <div
        className={`h-full rounded-full ${colorClasses[color]}`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
