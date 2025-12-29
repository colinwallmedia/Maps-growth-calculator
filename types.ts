
export interface UserData {
  industry: string;
  currentEnquiries: number;
  avgClientSpend: number;
  conversionRate: number;
  isRecurring: boolean;
}

export interface ScenarioResult {
  label: string;
  additionalEnquiries: number;
  newCustomers: number;
  monthlyRevenue: number;
  annualCumulativeRevenue: number;
  monthlyProjections: number[];
}

export interface CalculatorResults {
  moderate: ScenarioResult;
  average: ScenarioResult;
  overPerform: ScenarioResult;
}

export enum CalculationStep {
  INDUSTRY = 0,
  ENQUIRIES = 1,
  SPEND = 2,
  CONVERSION = 3,
  RESULTS = 4
}
