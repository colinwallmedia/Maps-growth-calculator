
import React from 'react';
import { UserData, CalculationStep } from '../types';
import { INDUSTRIES } from '../constants';
import { ProgressBar } from './ProgressBar';

interface SurveyFormProps {
  step: CalculationStep;
  data: UserData;
  onUpdate: (data: Partial<UserData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const SurveyForm: React.FC<SurveyFormProps> = ({ step, data, onUpdate, onNext, onBack }) => {
  const renderStep = () => {
    switch (step) {
      case CalculationStep.INDUSTRY:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">What is your industry?</h2>
            <p className="text-gray-500">Select the category that best describes your service business.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {INDUSTRIES.map((ind) => (
                <button
                  key={ind}
                  onClick={() => { onUpdate({ industry: ind }); onNext(); }}
                  className={`p-4 text-left border rounded-xl transition-all hover:border-blue-500 hover:bg-blue-50 ${data.industry === ind ? 'border-blue-600 bg-blue-50 font-medium text-blue-700' : 'border-gray-200 bg-white text-gray-600'}`}
                >
                  {ind}
                </button>
              ))}
            </div>
          </div>
        );

      case CalculationStep.ENQUIRIES:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">How many enquiries do you typically get each month?</h2>
            <p className="text-gray-500">Estimate your average number of phone calls, emails, or form submissions.</p>
            <div className="max-w-md mx-auto">
              <input
                type="number"
                value={data.currentEnquiries || ''}
                onChange={(e) => onUpdate({ currentEnquiries: Number(e.target.value) })}
                placeholder="e.g. 20"
                className="w-full text-center text-4xl font-bold p-6 border-2 border-gray-200 bg-white text-gray-900 rounded-2xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
              />
              <button
                onClick={onNext}
                disabled={!data.currentEnquiries && data.currentEnquiries !== 0}
                className="w-full mt-8 bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        );

      case CalculationStep.SPEND:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">What is the average client spend for a new customer?</h2>
            <p className="text-gray-500">How much is a typical job or contract worth to your business?</p>
            <div className="max-w-md mx-auto space-y-6">
              <div className="relative">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-3xl font-bold text-gray-400">£</span>
                <input
                  type="number"
                  value={data.avgClientSpend || ''}
                  onChange={(e) => onUpdate({ avgClientSpend: Number(e.target.value) })}
                  placeholder="e.g. 1400"
                  className="w-full text-center text-4xl font-bold p-6 pl-12 border-2 border-gray-200 bg-white text-gray-900 rounded-2xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
                />
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <input
                  type="checkbox"
                  id="recurring"
                  checked={data.isRecurring}
                  onChange={(e) => onUpdate({ isRecurring: e.target.checked })}
                  className="w-6 h-6 rounded text-blue-600 focus:ring-blue-500 bg-white"
                />
                <label htmlFor="recurring" className="text-sm font-medium text-gray-700 cursor-pointer select-none">
                  Is this a recurring monthly contract? (e.g. Commercial Cleaning)
                </label>
              </div>
              <button
                onClick={onNext}
                disabled={!data.avgClientSpend}
                className="w-full mt-2 bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        );

      case CalculationStep.CONVERSION:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">What is your conversion rate for new enquiries?</h2>
            <p className="text-gray-500">If 10 people contact you, how many typically become customers?</p>
            <div className="max-w-md mx-auto">
              <div className="relative">
                <input
                  type="number"
                  value={data.conversionRate || ''}
                  onChange={(e) => onUpdate({ conversionRate: Math.min(100, Number(e.target.value)) })}
                  placeholder="e.g. 60"
                  className="w-full text-center text-4xl font-bold p-6 pr-12 border-2 border-gray-200 bg-white text-gray-900 rounded-2xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-3xl font-bold text-gray-400">%</span>
              </div>
              <div className="mt-8 text-center bg-blue-50 p-4 rounded-xl text-blue-800 text-sm italic">
                A 60% rate means you close 6 out of every 10 leads.
              </div>
              <button
                onClick={onNext}
                disabled={!data.conversionRate}
                className="w-full mt-8 bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                Calculate Results
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <ProgressBar currentStep={step + 1} totalSteps={5} />
      
      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 min-h-[500px] flex flex-col justify-center border border-gray-100">
        {step > 0 && (
          <button 
            onClick={onBack}
            className="mb-6 flex items-center text-gray-400 hover:text-blue-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back
          </button>
        )}
        
        <div className="step-transition">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};
