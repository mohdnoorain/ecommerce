interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  color: "green" | "blue" | "purple" | "orange" | "red";
  change?: string;
  changeType?: "positive" | "negative";
}

export default function StatsCard({
  title,
  value,
  icon,
  color,
  change,
  changeType,
}: StatsCardProps) {
  const colorClasses = {
    green: "bg-green-500",
    blue: "bg-blue-500",
    purple: "bg-purple-500",
    orange: "bg-orange-500",
    red: "bg-red-500",
  };

  const iconBgClass = colorClasses[color];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-black">{value}</p>
          {change && (
            <div className="flex items-center mt-2">
              <span
                className={`text-sm font-medium ${
                  changeType === "positive" ? "text-green-600" : "text-red-600"
                }`}
              >
                {change}
              </span>
              <span className="text-gray-500 text-sm ml-1">vs last month</span>
            </div>
          )}
        </div>
        <div
          className={`w-12 h-12 ${iconBgClass} rounded-full flex items-center justify-center`}
        >
          <span className="text-2xl text-white">{icon}</span>
        </div>
      </div>
    </div>
  );
}
