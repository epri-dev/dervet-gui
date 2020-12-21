import CriticalLoadTimeSeries from '@/models/TimeSeries/CriticalLoadTimeSeries';
import SiteLoadTimeSeries from '@/models/TimeSeries/SiteLoadTimeSeries';
import PVGenerationTimeSeries from '@/models/TimeSeries/PVGenerationTimeSeries';

import { pvGen, criticalLoad, siteLoad } from '@/assets/cases/billReduction/csvs';

export const billReductionCompleteness = {
  overview: {
    start: true,
    objectives: true,
    technologySpecs: true,
  },
  components: {
    objectivesSiteInformation: true,
    objectivesResilience: true,
    financialInputs: true,
  },
};

// TODO turn this into a function
export const billReductionProject = {
  analysisHorizon: 20,
  analysisHorizonMode: '1',
  criticalLoad: new CriticalLoadTimeSeries(criticalLoad),
  dataYear: 2017,
  financeDiscountRate: 6,
  energyPriceSourceWholesale: false,
  financeFederalTaxRate: 0,
  gridLocation: 'Customer',
  financeInflationRate: 2.2,
  name: 'Economic BTM DER Sizing - Use Case 1',
  listOfActiveServices: ['Reliability', 'Retail Demand Charge Reduction'],
  objectivesBackupPower: false,
  objectivesDA: false,
  objectivesDeferral: false,
  objectivesFR: false,
  objectivesLoadFollowing: false,
  objectivesNSR: false,
  objectivesResilience: true,
  objectivesRetailDemandChargeReduction: true,
  objectivesRetailEnergyChargeReduction: true,
  objectivesSR: false,
  objectivesUserDefined: false,
  includeSiteLoad: true,
  includeInterconnectionConstraints: false,
  maxImport: -10000000000, // TODO figure this out
  maxExport: 10000000000, // TODO figure this out
  ownership: 'Customer',
  financePropertyTaxRate: 0,
  reliabilityTarget: 1,
  reliabilityPostOptimizationOnly: true,
  // nu: 20,
  // gamma: 43,
  reliabilityMaxOutageDuration: 24,
  retailTariffBillingPeriods: [
    {
      id: 1,
      startMonth: 1,
      endMonth: 5,
      startTime: 1,
      endTime: 8,
      excludingStartTime: false,
      excludingEndTime: false,
      weekday: 1,
      value: 0.054152,
      chargeType: 'Energy',
      name: 'Winter Offpeak',
    },
    {
      id: 2,
      startMonth: 1,
      endMonth: 5,
      startTime: 9,
      endTime: 21,
      excludingStartTime: false,
      excludingEndTime: false,
      weekday: 1,
      value: 0.062392,
      chargeType: 'Energy',
      name: 'Winter Mid-peak',
    },
    {
      id: 3,
      startMonth: 1,
      endMonth: 5,
      startTime: 22,
      endTime: 24,
      excludingStartTime: false,
      excludingEndTime: false,
      weekday: 1,
      value: 0.054152,
      chargeType: 'Energy',
      name: 'Winter Offpeak',
    },
    {
      id: 4,
      startMonth: 1,
      endMonth: 5,
      startTime: 1,
      endTime: 24,
      excludingStartTime: false,
      excludingEndTime: false,
      weekday: 0,
      value: 0.054152,
      chargeType: 'Energy',
      name: 'Winter Weekend',
    },
    {
      id: 5,
      startMonth: 6,
      endMonth: 9,
      startTime: 1,
      endTime: 8,
      excludingStartTime: false,
      excludingEndTime: false,
      weekday: 1,
      value: 0.049672,
      chargeType: 'Energy',
      name: 'Summer Offpeak',
    },
    {
      id: 6,
      startMonth: 6,
      endMonth: 9,
      startTime: 9,
      endTime: 12,
      excludingStartTime: false,
      excludingEndTime: false,
      weekday: 1,
      value: 0.086152,
      chargeType: 'Energy',
      name: 'Summer Mid-peak',
    },
    {
      id: 7,
      startMonth: 6,
      endMonth: 9,
      startTime: 13,
      endTime: 18,
      excludingStartTime: false,
      excludingEndTime: false,
      weekday: 1,
      value: 0.262392,
      chargeType: 'Energy',
      name: 'Summer Peak',
    },
    {
      id: 8,
      startMonth: 6,
      endMonth: 9,
      startTime: 19,
      endTime: 23,
      excludingStartTime: false,
      excludingEndTime: false,
      weekday: 1,
      value: 0.086152,
      chargeType: 'Energy',
      name: 'Summer Mid-peak',
    },
    {
      id: 9,
      startMonth: 6,
      endMonth: 9,
      startTime: 24,
      endTime: 24,
      excludingStartTime: false,
      excludingEndTime: false,
      weekday: 1,
      value: 0.049672,
      chargeType: 'Energy',
      name: 'Summer Offpeak',
    },
    {
      id: 10,
      startMonth: 6,
      endMonth: 9,
      startTime: 1,
      endTime: 24,
      excludingStartTime: false,
      excludingEndTime: false,
      weekday: 0,
      value: 0.049672,
      chargeType: 'Energy',
      name: 'Summer Weekend',
    },
    {
      id: 11,
      startMonth: 10,
      endMonth: 12,
      startTime: 1,
      endTime: 8,
      excludingStartTime: false,
      excludingEndTime: false,
      weekday: 1,
      value: 0.054152,
      chargeType: 'Energy',
      name: 'Winter Offpeak',
    },
    {
      id: 12,
      startMonth: 10,
      endMonth: 12,
      startTime: 9,
      endTime: 21,
      excludingStartTime: false,
      excludingEndTime: false,
      weekday: 1,
      value: 0.062392,
      chargeType: 'Energy',
      name: 'Winter Peak',
    },
    {
      id: 13,
      startMonth: 10,
      endMonth: 12,
      startTime: 22,
      endTime: 24,
      excludingStartTime: false,
      excludingEndTime: false,
      weekday: 1,
      value: 0.054152,
      chargeType: 'Energy',
      name: 'Winter Offpeak',
    },
    {
      id: 14,
      startMonth: 10,
      endMonth: 12,
      startTime: 1,
      endTime: 24,
      excludingStartTime: false,
      excludingEndTime: false,
      weekday: 0,
      value: 0.054152,
      chargeType: 'Energy',
      name: 'Winter Weekend',
    },
    {
      id: 15,
      startMonth: 1,
      endMonth: 12,
      startTime: 1,
      endTime: 24,
      excludingStartTime: false,
      excludingEndTime: false,
      weekday: 2,
      value: 7.016,
      chargeType: 'Demand',
      name: 'Demand Charge',
    },
  ],
  siteLoad: new SiteLoadTimeSeries(siteLoad),
  sizingEquipment: true,
  startYear: '2017',
  financeStateTaxRate: 0,
  technologySpecsSolarPV: [{
    active: true,
    allowGridCharge: true,
    complete: true,
    constructionYear: 2017,
    cost: 1660,
    decomissioningCost: 0,
    errorList: [],
    expectedLifetime: 99,
    fixedOMCosts: 0,
    gamma: null,
    generationProfile: new PVGenerationTimeSeries(pvGen),
    id: '524bd961-1a12-43e0-b963-7f05e22ae5d5',
    includeCurtailment: false,
    includePPA: false,
    includeSizeLimits: false,
    inverterMax: 1000000000,
    isReplaceable: 0,
    loc: 'AC',
    macrsTerm: 3,
    name: 'Installation 1',
    nu: null,
    operationYear: 2017,
    ppaCost: null,
    ppaInflationRate: null,
    ratedCapacity: 1000,
    ratedCapacityMaximum: null,
    ratedCapacityMinimum: null,
    replacementCost: 100,
    replacementConstructionTime: 1,
    salvageValue: 'User defined',
    salvageValueOption: 0,
    shouldSize: false,
    tag: 'PV',
    technologyType: 'Intermittent Resource',
    ter: 7,
  }],
  technologySpecsBattery: [{
    active: true,
    auxiliaryLoad: 0,
    batteryCycles: [
      { ulimit: 0.05, val: 75000 },
      { ulimit: 0.1, val: 40500 },
      { ulimit: 0.15, val: 27000 },
      { ulimit: 0.2, val: 20250 },
      { ulimit: 0.3, val: 11250 },
      { ulimit: 0.4, val: 6750 },
      { ulimit: 0.5, val: 4500 },
      { ulimit: 0.6, val: 3750 },
      { ulimit: 0.7, val: 3225 },
      { ulimit: 0.8, val: 2813 },
      { ulimit: 0.9, val: 2475 },
      { ulimit: 1, val: 2250 },
    ],
    calendarDegradationRate: 0,
    capitalCost: 0,
    capitalCostPerkW: 800,
    capitalCostPerkWh: 250,
    chargingCapacity: null,
    chargingCapacityMaximum: null,
    chargingCapacityMinimum: null,
    complete: true,
    constructionYear: 2017,
    dailyCycleLimit: 0,
    dischargingCapacity: null,
    dischargingCapacityMaximum: null,
    dischargingCapacityMinimum: null,
    decomissioningCost: 0,
    endOfLifeExpenses: 0,
    energyCapacity: 2000,
    energyCapacityMaximum: null,
    energyCapacityMinimum: null,
    expectedLifetime: 99,
    errorList: [],
    fixedOMCosts: 10,
    id: '024c07e1-4005-4423-99ac-6c95974ba836',
    includeAuxiliaryLoad: false,
    includeCycleDegradation: false,
    includeSizeLimits: false,
    isReplaceable: false,
    lowerSOCLimit: 0,
    macrsTerm: 3,
    maxDuration: 0,
    name: 'BESS 1',
    operationYear: 2017,
    powerCapacity: null,
    powerCapacityMaximum: null,
    powerCapacityMinimum: null,
    replacementConstructionTime: 1,
    replacementCost: 0,
    replacementCostPerkW: 100,
    replacementCostPerkWh: 800,
    roundtripEfficiency: 91,
    salvageValue: 0,
    salvageValueOption: 'User defined',
    selfDischargeRate: 0,
    shouldDiffChargeDischarge: false,
    shouldEnergySize: true,
    shouldLimitDailyCycling: false,
    shouldMaxDuration: false,
    shouldPowerSize: true,
    stateOfHealth: 0,
    tag: 'Battery',
    targetSOC: 50,
    technologyType: 'Energy Storage System',
    ter: 7,
    upperSOCLimit: 100,
    variableOMCosts: 0,
  }],
  timestep: 60,
};

export default billReductionProject;
