import React from 'react';

const LoadingSpinner = ({
  label = 'Loading...',
  containerClassName = '',
  spinnerClassName = '',
  labelClassName = '',
}) => {
  return (
    <div className={`flex items-center justify-center gap-3 py-6 ${containerClassName}`.trim()}>
      <div
        className={`h-10 w-10 animate-spin rounded-full border-2 border-[#E2E8F0] border-t-btn-primary ${spinnerClassName}`.trim()}
        aria-hidden="true"
      />
      {label ? <p className={`text-sm text-gray-500 ${labelClassName}`.trim()}>{label}</p> : null}
    </div>
  );
};

export default LoadingSpinner;
