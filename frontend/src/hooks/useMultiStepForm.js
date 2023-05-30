// Hook personalizado useMultiStepForm
import { useState } from 'react';

const useMultiStepForm = (initialStep = 0) => {
  const [step, setStep] = useState(initialStep);

  const handleNextStep = (e) => {
    e.preventDefault();
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = (e) => {
    e.preventDefault();
    setStep((prevStep) => prevStep - 1);
  };

  return { step, handleNextStep, handlePrevStep };
};

export default useMultiStepForm;
