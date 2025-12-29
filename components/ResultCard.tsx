
import React from 'react';
import { ScenarioResult } from '../types';

interface ResultCardProps {
  result: ScenarioResult;
  isPopular?: boolean;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, isPopular }) => {
  return (
    <div className={`relative p-6 rounded-2xl border ${isPopular ? 'border-blue-500 bg-blue-50/30 shadow-xl scale-105 z-10' : 'border-gray-200 bg-white shadow-sm'} transition-all`}>
      {isPopular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Most Likely
        </span>
      )}
      
      <h3 className="text-xl font-bold text-gray-900 mb-4">{result.label}</h3>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center border-b border-gray-100 pb-2">
          <span className="text-sm text-gray-500">New Enquiries /mo</span>
          <span className="text-lg font-semibold text-blue-600">+{result.additionalEnquiries}</span>
        </div>
        
        <div className="flex justify-between items-center border-b border-gray-100 pb-2">
          <span className="text-sm text-gray-500">Enquiries to Customers</span>
          <span className="text-lg font-semibold text-gray-800">{result.newCustomers}</span>
        </div>

        <div className="flex justify-between items-center border-b border-gray-100 pb-2">
          <span className="text-sm text-gray-500">Additional Revenue /mo</span>
          <span className="text-xl font-bold text-green-600">£{result.monthlyRevenue.toLocaleString()}</span>
        </div>

        <div className="pt-4 bg-gray-50 -mx-6 px-6 -mb-6 rounded-b-2xl mt-4 border-t border-gray-200">
          <div className="flex flex-col py-4">
            <span className="text-xs uppercase text-gray-400 font-bold tracking-widest mb-1">12-Month Cumulative</span>
            <span className="text-2xl font-black text-blue-900">£{result.annualCumulativeRevenue.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
