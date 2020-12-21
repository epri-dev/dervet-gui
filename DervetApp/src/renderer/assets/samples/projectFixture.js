import _ from 'lodash';

import CriticalLoadTimeSeries from '@/models/TimeSeries/CriticalLoadTimeSeries';
import DeferralLoadTimeSeries from '@/models/TimeSeries/DeferralLoadTimeSeries';
import DAPriceTimeSeries from '@/models/TimeSeries/DAPriceTimeSeries';
import FRDownPriceTimeSeries from '@/models/TimeSeries/FRDownPriceTimeSeries';
import FRPriceTimeSeries from '@/models/TimeSeries/FRPriceTimeSeries';
import FRUpPriceTimeSeries from '@/models/TimeSeries/FRUpPriceTimeSeries';
import NSRPriceTimeSeries from '@/models/TimeSeries/NSRPriceTimeSeries';
import SRPriceTimeSeries from '@/models/TimeSeries/SRPriceTimeSeries';
import UserEnergyMaxTimeSeries from '@/models/TimeSeries/UserEnergyMaxTimeSeries';
import UserEnergyMinTimeSeries from '@/models/TimeSeries/UserEnergyMinTimeSeries';
import UserPowerMaxTimeSeries from '@/models/TimeSeries/UserPowerMaxTimeSeries';
import UserPowerMinTimeSeries from '@/models/TimeSeries/UserPowerMinTimeSeries';

import csvs from './csvs';

const OUTPUT_DIRECTORY = '/path/to/output';

export const projectFixture = {
  analysisHorizon: 0,
  analysisHorizonMode: '1',
  criticalLoad: new CriticalLoadTimeSeries(csvs.siteLoad), // note: using hardcoded site load
  daGrowth: 0,
  daPrice: new DAPriceTimeSeries(csvs.daPrice),
  dataYear: 2017,
  deferralPlannedLoadLimit: 4000,
  deferralReversePowerFlowLimit: -1000,
  deferralGrowth: 2,
  deferralPrice: 0,
  deferralLoad: new DeferralLoadTimeSeries(csvs.deferralLoad),
  externalIncentives: [
    {
      id: '1',
      year: 2017,
      taxCredit: 300,
      otherIncentive: 100,
    },
    {
      id: '2',
      year: 2018,
      taxCredit: 200,
      otherIncentive: 100,
    },
  ],
  financeDiscountRate: 7,
  financeFederalTaxRate: 3,
  financeInflationRate: 3,
  financePropertyTaxRate: 3,
  financeStateTaxRate: 3,
  frPrice: new FRPriceTimeSeries(csvs.price),
  frUpPrice: new FRUpPriceTimeSeries(csvs.price),
  frDownPrice: new FRDownPriceTimeSeries(csvs.price),
  gridLocation: 'Customer',
  outputDirectory: OUTPUT_DIRECTORY,
  name: 'None',
  nsrPrice: new NSRPriceTimeSeries(csvs.price),
  objectivesDA: true,
  siteLoad: null,
  includeSiteLoad: false,
  includeInterconnectionConstraints: false,
  maxImport: -10000,
  maxExport: 40000,
  optimizationHorizon: 'month',
  ownership: 'Customer',
  retailTariffBillingPeriods: [
    {
      id: 1,
      startMonth: 1,
      endMonth: 5,
      startTime: 1,
      endTime: 24,
      excludingStartTime: null,
      excludingEndTime: null,
      weekday: 2,
      value: 0.05323,
      chargeType: 'Energy',
      name: '',
    },
    {
      id: 2,
      startMonth: 1,
      endMonth: 5,
      startTime: 1,
      endTime: 24,
      excludingStartTime: null,
      excludingEndTime: null,
      weekday: 2,
      value: 19.32,
      chargeType: 'Demand',
      name: '',
    },
    {
      id: 3,
      startMonth: 6,
      endMonth: 9,
      startTime: 1,
      endTime: 24,
      excludingStartTime: null,
      excludingEndTime: null,
      weekday: 2,
      value: 0.05668,
      chargeType: 'Energy',
      name: '',
    },
    {
      id: 4,
      startMonth: 6,
      endMonth: 9,
      startTime: 1,
      endTime: 24,
      excludingStartTime: null,
      excludingEndTime: null,
      weekday: 2,
      value: 7.08,
      chargeType: 'Demand',
      name: '',
    },
    {
      id: 5,
      startMonth: 10,
      endMonth: 12,
      startTime: 1,
      endTime: 24,
      excludingStartTime: null,
      excludingEndTime: null,
      weekday: 2,
      value: 0.05323,
      chargeType: 'Energy',
      name: '',
    },
    {
      id: 6,
      startMonth: 10,
      endMonth: 12,
      startTime: 1,
      endTime: 24,
      excludingStartTime: null,
      excludingEndTime: null,
      weekday: 2,
      value: 30.5,
      chargeType: 'Demand',
      name: '',
    },
  ],
  srPrice: new SRPriceTimeSeries(csvs.price),
  startYear: '2017',
  technologySpecsSolarPV: [],
  technologySpecsICE: [],
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
    capitalCostPerkW: 100,
    capitalCostPerkWh: 800,
    chargingCapacity: 1000,
    chargingCapacityMaximum: null,
    chargingCapacityMinimum: null,
    constructionYear: 2017,
    dailyCycleLimit: 1,
    dischargingCapacity: 1000,
    dischargingCapacityMaximum: null,
    dischargingCapacityMinimum: null,
    decomissioningCost: 0,
    energyCapacity: 2000,
    energyCapacityMaximum: null,
    energyCapacityMinimum: null,
    expectedLifetime: 99,
    errorList: [],
    fixedOMCosts: 1000,
    name: 'Battery',
    id: '',
    includeAuxiliaryLoad: false,
    includeCycleDegradation: false,
    includeSizeLimits: false,
    isReplaceable: false,
    lowerSOCLimit: 0,
    macrsTerm: 3,
    maxDuration: 0,
    operationYear: 2017,
    powerCapacity: 0,
    powerCapacityMaximum: null,
    powerCapacityMinimum: null,
    replacementConstructionTime: 1,
    replacementCost: 0,
    replacementCostPerkW: 100,
    replacementCostPerkWh: 800,
    roundtripEfficiency: 85,
    salvageValue: 0,
    salvageValueOption: 'User defined',
    selfDischargeRate: 0,
    shouldDiffChargeDischarge: true,
    shouldEnergySize: false,
    shouldLimitDailyCycling: false,
    shouldMaxDuration: false,
    shouldPowerSize: false,
    stateOfHealth: null,
    tag: 'Battery',
    targetSOC: 50,
    technologyType: 'Energy Storage System',
    ter: 7,
    upperSOCLimit: 100,
    variableOMCosts: 0,
  }],
  technologySpecsDieselGen: [],
  timestep: 1,
  type: 'Wizard',
  userEnergyMax: new UserEnergyMaxTimeSeries(_.fill(Array(8760), 9000)),
  userEnergyMin: new UserEnergyMinTimeSeries(_.fill(Array(8760), 0)),
  userPowerMax: new UserPowerMaxTimeSeries(_.fill(Array(8760), 1900)),
  userPowerMin: new UserPowerMinTimeSeries(_.fill(Array(8760), -1900)),
};

export const getProjectFixture = (inputsDir, resultsDir) => {
  const res = _.cloneDeep(projectFixture);
  res.inputsDirectory = inputsDir;
  res.resultsDirectory = resultsDir;
  return res;
};
