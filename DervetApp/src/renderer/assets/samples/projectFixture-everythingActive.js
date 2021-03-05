import _ from 'lodash';

import CriticalLoadTimeSeries from '@/models/TimeSeries/CriticalLoadTimeSeries';
import DeferralLoadTimeSeries from '@/models/TimeSeries/DeferralLoadTimeSeries';
import DAPriceTimeSeries from '@/models/TimeSeries/DAPriceTimeSeries';
import FRDownPriceTimeSeries from '@/models/TimeSeries/FRDownPriceTimeSeries';
import FRPriceTimeSeries from '@/models/TimeSeries/FRPriceTimeSeries';
import FRUpPriceTimeSeries from '@/models/TimeSeries/FRUpPriceTimeSeries';
import LFDownPriceTimeSeries from '@/models/TimeSeries/LFDownPriceTimeSeries';
import LFEnergyOptionDownTimeSeries from '@/models/TimeSeries/LFEnergyOptionDownTimeSeries';
import LFEnergyOptionUpTimeSeries from '@/models/TimeSeries/LFEnergyOptionUpTimeSeries';
import LFPriceTimeSeries from '@/models/TimeSeries/LFPriceTimeSeries';
import LFUpPriceTimeSeries from '@/models/TimeSeries/LFUpPriceTimeSeries';
import NSRPriceTimeSeries from '@/models/TimeSeries/NSRPriceTimeSeries';
import PVGenerationTimeSeries from '@/models/TimeSeries/PVGenerationTimeSeries';
import RAActiveTimeSeries from '@/models/TimeSeries/RAActiveTimeSeries';
import SRPriceTimeSeries from '@/models/TimeSeries/SRPriceTimeSeries';
import SiteLoadTimeSeries from '@/models/TimeSeries/SiteLoadTimeSeries';
import SystemLoadTimeSeries from '@/models/TimeSeries/SystemLoadTimeSeries';
import UserEnergyMaxTimeSeries from '@/models/TimeSeries/UserEnergyMaxTimeSeries';
import UserEnergyMinTimeSeries from '@/models/TimeSeries/UserEnergyMinTimeSeries';
import UserPowerMaxTimeSeries from '@/models/TimeSeries/UserPowerMaxTimeSeries';
import UserPowerMinTimeSeries from '@/models/TimeSeries/UserPowerMinTimeSeries';

import BackupEnergyAdwardsMonthly from '@/models/Monthly/BackupEnergyAdwardsMonthly';
import BackupEnergyReservationMonthly from '@/models/Monthly/BackupEnergyReservationMonthly';
import DRCapacityAdwardsMonthly from '@/models/Monthly/DRCapacityAdwardsMonthly';
import DRCapacityReservationMonthly from '@/models/Monthly/DRCapacityReservationMonthly';
import DREnergyAwardsMonthly from '@/models/Monthly/DREnergyAwardsMonthly';
import DRMonthsMonthly from '@/models/Monthly/DRMonthsMonthly';
import RACapacityPriceMonthly from '@/models/Monthly/RACapacityPriceMonthly';

import csvs from './csvs';

const OUTPUT_DIRECTORY = '/path/to/output';
const TRUE = true;

export const projectFixtureAllActive = {
  analysisHorizon: 0,
  analysisHorizonMode: '1',
  backupPrice: new BackupEnergyAdwardsMonthly(new Array(12).fill(100)),
  backupEnergyReservation: new BackupEnergyReservationMonthly(new Array(12).fill(30)),
  criticalLoad: new CriticalLoadTimeSeries(csvs.siteLoad), // note: using hardcoded site load
  daGrowth: 0,
  daPrice: new DAPriceTimeSeries(csvs.daPrice),
  dataYear: 2017,
  dcmGrowth: 5,
  discountRate: 7,
  deferralPlannedLoadLimit: 11000,
  deferralReversePowerFlowLimit: -11000,
  deferralGrowth: 0,
  deferralPrice: 10000,
  deferralLoad: new DeferralLoadTimeSeries(csvs.deferralLoad),
  drCapacityReservation: new DRCapacityReservationMonthly(new Array(12).fill(100)),
  drCapacityAwards: new DRCapacityAdwardsMonthly(new Array(12).fill(50)),
  drEndHour: 24,
  drEventLength: null,
  drEnergyAwards: new DREnergyAwardsMonthly(new Array(12).fill(68)),
  drGrowth: 1.47,
  drIncludeWeekends: true,
  drNumberEvents: 8,
  drMonthsApplied: new DRMonthsMonthly([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]),
  drProgramType: 'Day of',
  drStartHour: 10,
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
  federalTaxRate: 3,
  frEOU: 0.3,
  frEOD: 0.3,
  frGrowth: 2,
  frEnergyPriceGrowth: 5,
  frCombinedMarket: 0,
  frDuration: 0,
  tsFrPrice: new FRPriceTimeSeries(csvs.price),
  tsFrUpPrice: new FRUpPriceTimeSeries(csvs.price),
  tsFrDownPrice: new FRDownPriceTimeSeries(csvs.price),
  gridLocation: 'Customer',
  includeSiteLoad: TRUE,
  includeInterconnectionConstraints: TRUE,
  includeSystemLoad: TRUE,
  inflationRate: 3,
  lfDownPrice: new LFDownPriceTimeSeries(csvs.price),
  lfDuration: 0,
  lfCombinedMarket: TRUE,
  lfGrowth: 2,
  lfEnergyPriceGrowth: 1.5,
  lfEOU: new LFEnergyOptionUpTimeSeries(csvs.deferralLoad), // TODO fix this
  lfEOD: new LFEnergyOptionDownTimeSeries(csvs.deferralLoad), // TODO fix this
  lfPrice: new LFPriceTimeSeries(csvs.price),
  lfUpPrice: new LFUpPriceTimeSeries(csvs.price),
  maxImport: -10000,
  maxExport: 40000,
  nsrGrowth: 2,
  nsrDuration: 0,
  tsNsrPrice: new NSRPriceTimeSeries(csvs.price),
  objectivesDA: TRUE,
  objectivesDR: TRUE,
  objectivesResilience: TRUE,
  objectivesBackupPower: TRUE,
  objectivesRA: TRUE,
  objectivesRetailDemandChargeReduction: TRUE,
  objectivesRetailEnergyChargeReduction: TRUE,
  objectivesSR: TRUE,
  objectivesNSR: TRUE,
  objectivesFR: TRUE,
  objectivesDeferral: TRUE,
  objectivesLF: TRUE,
  objectivesUserDefined: TRUE,
  optimizationHorizon: 'month',
  outputDirectory: OUTPUT_DIRECTORY,
  ownership: 'Customer',
  propertyTaxRate: 3,
  tsRaActive: new RAActiveTimeSeries(new Array(8760).fill(0)),
  mtsRaCapacityPrice: new RACapacityPriceMonthly(new Array(12).fill(350)),
  raNumberEvents: 24,
  raEventLength: 6,
  raDispatchMode: 'Constrain power',
  raEventSelectionMethod: 'Peak by Year',
  raGrowth: 0.86,
  reliabilityTarget: 6,
  reliabilityPostOptimizationOnly: false,
  reliabilityMaxOutageDuration: 12,
  retailTimeShiftGrowth: 4,
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
  siteLoad: new SiteLoadTimeSeries(csvs.siteLoad),
  srGrowth: 6.2,
  srDuration: 0,
  tsSrPrice: new SRPriceTimeSeries(csvs.price),
  startYear: 2017,
  stateTaxRate: 3,
  systemLoad: new SystemLoadTimeSeries(csvs.siteLoad),
  technologySpecsSolarPV: [{
    active: true,
    allowGridCharge: false,
    complete: true,
    constructionYear: 2017,
    cost: 200,
    decomissioningCost: 0,
    errorList: [],
    expectedLifetime: 99,
    fixedOMCosts: 0,
    gamma: 0,
    generationProfile: new PVGenerationTimeSeries(csvs.deferralLoad), // TODO fix this
    id: '',
    includeCurtailment: false,
    includePPA: false,
    includeSizeLimits: false,
    inverterMax: 3000,
    isReplaceable: 0,
    loc: 'ac',
    macrsTerm: 3,
    name: 'solar',
    nu: 0,
    operationYear: 2017,
    ppaCost: null,
    ppaInflationRate: null,
    ratedCapacity: 100,
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
  technologySpecsICE: [{
    active: true,
    capitalCost: 0,
    capitalCostPerkW: 0,
    complete: true,
    constructionYear: 2017,
    decomissioningCost: 0,
    efficiency: 0.15,
    errorList: [],
    expectedLifetime: 13,
    fixedOMCostIncludingExercise: 0,
    fuelCost: 0,
    id: '',
    includeSizeLimits: false,
    isReplaceable: false,
    macrsTerm: '3',
    minimumPower: 0,
    name: 'gen',
    numGenerators: 2,
    operationYear: 2017,
    ratedCapacity: 4000,
    ratedCapacityMaximum: null,
    ratedCapacityMinimum: null,
    replacementCost: 200,
    replacementCostPerkW: 200,
    replacementConstructionTime: 1,
    salvageValue: 0,
    salvageValueOption: 'User defined',
    shouldSize: false,
    tag: 'ICE',
    technologyType: 'Generator',
    ter: 7,
    variableOMCost: 0,
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
    capitalCostPerkW: 100,
    capitalCostPerkWh: 800,
    chargingCapacity: 1000,
    chargingCapacityMaximum: null,
    chargingCapacityMinimum: null,
    constructionYear: 2017,
    complete: true,
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
  technologySpecsDieselGen: [{
    active: true,
    tag: 'DieselGen',
    technologyType: 'Generator',
    id: '',
    name: 'Diesel Generator',
    ratedCapacity: 4000,
    minimumPower: 100,
    startupTime: 0, // TODO remove
    efficiency: 0.15,
    fuelCost: 3.5,
    capitalCost: 200,
    variableOMCost: 10,
    fixedOMCostIncludingExercise: 12,
    constructionDate: 2017,
    operationDate: 2017,
    macrsTerm: 3,
    shouldSize: false,
    numGenerators: 2,
    minGenerators: 0,
    maxGenerators: 1,
  }],
  technologySpecsControllableLoad: [],
  technologySpecsFleetEV: [],
  technologySpecsSingleEV: [],
  timestep: 1,
  userPrice: 347,
  userEnergyMax: new UserEnergyMaxTimeSeries(_.fill(Array(8760), 9000)),
  userEnergyMin: new UserEnergyMinTimeSeries(_.fill(Array(8760), 0)),
  userPowerMax: new UserPowerMaxTimeSeries(_.fill(Array(8760), 1900)),
  userPowerMin: new UserPowerMinTimeSeries(_.fill(Array(8760), -1900)),
};

export const getProjectFixture = (inputsDir, resultsDir) => {
  const res = _.cloneDeep(projectFixtureAllActive);
  res.inputsDirectory = inputsDir;
  res.resultsDirectory = resultsDir;
  return res;
};
