import type { Dispatch, SetStateAction } from "react";

interface Alert {
  alertMessage: string | undefined;
  setShowAlert: Dispatch<SetStateAction<boolean>>
};

export default function Alert({ alertMessage, setShowAlert }: Alert) {
  return (
    <div 
      role="alert" 
      className="alert alert-error fixed top-4 right-4 z-50 shadow-lg"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-6 w-6 shrink-0 stroke-current cursor-pointer" 
        fill="none" viewBox="0 0 24 24"
        onClick={() => setShowAlert(false)}
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" 
        />
      </svg>
      <span>{alertMessage}</span>
    </div>
  );
};
