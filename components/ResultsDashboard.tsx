
import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { UserData, CalculatorResults } from '../types';
import { calculateResults } from '../services/calculator';
import { ResultCard } from './ResultCard';

interface ResultsDashboardProps {
  data: UserData;
  onReset: () => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ data, onReset }) => {
  const results = useMemo(() => calculateResults(data), [data]);

  const chartData = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      name: `Month ${i + 1}`,
      Moderate: results.moderate.monthlyProjections[i],
      Average: results.average.monthlyProjections[i],
      'Over Perform': results.overPerform.monthlyProjections[i],
    }));
  }, [results]);

  const formatCurrency = (value: number) => `£${value.toLocaleString()}`;

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col items-center gap-6">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Your Projected Growth with GBP Optimization</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Based on your {data.industry} business metrics, here is the potential revenue hidden in the Google Map Pack.
          </p>
        </div>
        <button 
          onClick={onReset}
          className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold rounded-full text-sm transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Redo Survey
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <ResultCard result={results.moderate} />
        <ResultCard result={results.average} isPopular={true} />
        <ResultCard result={results.overPerform} />
      </div>

      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">12-Month Cumulative Revenue Growth</h3>
            <p className="text-gray-500">How your additional revenue scales over the next year.</p>
          </div>
          <div className="flex gap-2">
            <span className="flex items-center text-xs text-gray-600"><span className="w-3 h-3 bg-blue-300 rounded-full mr-2"></span>Moderate</span>
            <span className="flex items-center text-xs text-gray-600"><span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>Average</span>
            <span className="flex items-center text-xs text-gray-600"><span className="w-3 h-3 bg-indigo-600 rounded-full mr-2"></span>Over Perform</span>
          </div>
        </div>

        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorMod" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#93c5fd" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#93c5fd" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorOver" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={formatCurrency} />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                formatter={(value: number) => formatCurrency(value)}
              />
              <Area type="monotone" dataKey="Moderate" stroke="#93c5fd" fillOpacity={1} fill="url(#colorMod)" />
              <Area type="monotone" dataKey="Average" stroke="#3b82f6" fillOpacity={1} fill="url(#colorAvg)" />
              <Area type="monotone" dataKey="Over Perform" stroke="#4f46e5" fillOpacity={1} fill="url(#colorOver)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-indigo-900 text-white p-10 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        <div className="relative z-10 space-y-4 max-w-xl">
          <h3 className="text-3xl font-bold">Ready to claim your spot in the Top 3?</h3>
          <p className="text-indigo-100 text-lg">
            Our specialized GBP heatmap audit shows exactly where you're losing customers to competitors. Start your journey for just <span className="font-bold text-white">£350/mo</span>.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
             <button className="bg-white text-indigo-900 font-bold px-8 py-4 rounded-xl hover:bg-indigo-50 transition-colors">
               Get Your Heatmap Audit
             </button>
             <button onClick={onReset} className="border border-indigo-300 text-indigo-100 font-medium px-8 py-4 rounded-xl hover:bg-indigo-800 transition-colors">
               Recalculate
             </button>
          </div>
        </div>
        <div className="relative z-10 bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/10">
           <div className="text-4xl font-black text-white mb-1">
             ~£{results.average.annualCumulativeRevenue.toLocaleString()}
           </div>
           <div className="text-sm uppercase tracking-widest text-indigo-200">
             Potential Revenue Opportunity
           </div>
        </div>
        
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-indigo-500 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
      </div>
    </div>
  );
};
