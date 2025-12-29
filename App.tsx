
import React, { useState } from 'react';
import { CalculationStep, UserData } from './types';
import { SurveyForm } from './components/SurveyForm';
import { ResultsDashboard } from './components/ResultsDashboard';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<CalculationStep>(CalculationStep.INDUSTRY);
  const [userData, setUserData] = useState<UserData>({
    industry: '',
    currentEnquiries: 0,
    avgClientSpend: 0,
    conversionRate: 0,
    isRecurring: false
  });

  const handleUpdate = (updates: Partial<UserData>) => {
    setUserData(prev => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (currentStep < CalculationStep.RESULTS) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > CalculationStep.INDUSTRY) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(CalculationStep.INDUSTRY);
    setUserData({
      industry: '',
      currentEnquiries: 0,
      avgClientSpend: 0,
      conversionRate: 0,
      isRecurring: false
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Navigation Header */}
      <header className="w-full bg-white border-b border-gray-100 py-6 px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 10C21 16.0751 16.0751 21 10 21C3.92487 21 2 16.0751 2 10C2 3.92487 6.92487 2 13 2C19.0751 2 21 3.92487 21 10Z" stroke="currentColor" strokeWidth="2" />
              <path d="M12 11V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M12 8V8.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-xl font-black text-gray-900 uppercase tracking-tighter">MAPS GROWTH</span>
        </div>
        <div className="hidden md:block">
          <a href="#" className="text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors">
            Book Heatmap Audit
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-12">
        {currentStep === CalculationStep.RESULTS ? (
          <ResultsDashboard data={userData} onReset={handleReset} />
        ) : (
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                Calculate Your <span className="text-blue-600">Untapped Revenue</span>
              </h1>
              <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                Are you losing customers to your competitors in the Google Map Pack? Use our calculator to see the potential impact of ranking in the top 3.
              </p>
            </div>
            
            <SurveyForm 
              step={currentStep}
              data={userData}
              onUpdate={handleUpdate}
              onNext={handleNext}
              onBack={handleBack}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-gray-100 py-12 px-8">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-400">© 2024 Maps Growth Optimization. Specialist GBP Ranking Agency.</p>
          </div>
          <div className="flex gap-8 text-sm font-medium text-gray-500">
            <a href="#" className="hover:text-blue-600">Privacy</a>
            <a href="#" className="hover:text-blue-600">Terms</a>
            <a href="#" className="hover:text-blue-600">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
