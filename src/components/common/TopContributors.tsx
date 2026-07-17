import React from "react";

// 1. Export the singular interface so other files (like mocks) can use it
export interface TopContributor {
  id: string;
  name: string;
  role: string;
  avatar: string;
  score: number;
}

interface TopContributorsProps {
  contributors: TopContributor[];
}

export const TopContributors: React.FC<TopContributorsProps> = ({
  contributors,
}) => {
  return (
    <div className="flex flex-col">
      {contributors.map((user, index) => (
        <div
          key={user.id}
          className={`flex items-center justify-between py-3 ${
            index !== contributors.length - 1
              ? "border-b border-slate-700"
              : ""
          }`}
        >
          <div className="flex items-center gap-3">
            <img
              src={user.avatar}
              alt={user.name}
              className="h-10 w-10 rounded-full object-cover"
            />

            <div>
              <p className="text-sm font-medium text-white">
                {user.name}
              </p>
              <p className="text-xs text-slate-400">
                {user.role}
              </p>
            </div>
          </div>

          <span
            className={`text-sm font-medium ${
              user.score >= 0
                ? "text-[#7DD3FC]"
                : "text-slate-500"
            }`}
          >
            {user.score > 0 ? `+${user.score}` : user.score}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TopContributors;