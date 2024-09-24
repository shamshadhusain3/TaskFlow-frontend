import React from 'react';

const IndividualGoals = () => {
  const goals = [
    {
      id: 1,
      title: 'Complete React Certification',
      description: 'Finish the advanced React course by the end of this month.',
    },
    {
      id: 2,
      title: 'Improve Code Quality',
      description: 'Refactor the legacy code in the main project.',
    },
    {
      id: 3,
      title: 'Contribute to Open Source',
      description: 'Make at least 3 contributions to open source projects.',
    },
  ];

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">My Goals</h2>
      <div className="space-y-4">
        {goals.map((goal) => (
          <div key={goal.id} className="bg-white shadow-lg rounded-lg p-4 border-t-4 border-blue-500">
            <h3 className="text-xl font-semibold text-blue-700">{goal.title}</h3>
            <p className="text-gray-600">{goal.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndividualGoals;
