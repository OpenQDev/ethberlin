import React from 'react';

const StepProgress = ({ steps, handleSetStep, selectedFiles }) => {
  const getActiveClass = (s) => {
    if (s.active) {
      return 'pinata-step pinata-active-step';
    } else if (selectedFiles.length > 0) {
      return 'pinata-cursor pinata-step';
    } else {
      return 'pinata-no-click pinata-step';
    }
  };

  const handleClick = (s) => {
    if (s.key === 3) {
      return null;
    } else if (selectedFiles.length > 0) {
      return handleSetStep(s.key - 1);
    }
    return null;
  };
  return (
    <div className='pinata-progress-nav'>
      {steps.map((s) => {
        return (
          <div onClick={() => handleClick(s)} key={s.key} className={getActiveClass(s)}>
            {s.key}
          </div>
        );
      })}
    </div>
  );
};

export default StepProgress;
