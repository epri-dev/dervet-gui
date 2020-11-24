import { cloneDeep, flatten } from 'lodash';

import { projectMetadata } from '@/models/Project/Project';
import ObjectivesSiteInformationMetadata from '@/models/Project/Objectives/ObjectivesSiteInformation';

const metadataDefaultValues = projectMetadata.getDefaultValues();
const siteInformationMetaData = ObjectivesSiteInformationMetadata.getHardcodedMetadata();

const getDefaultState = () => ({
  ...metadataDefaultValues,
  routeObjectivesFinancialsLL: null,

  // SCENARIO
  noChargingFromGrid: false,
  noDischargingToGrid: false,
  // FINANCES
  discountRate: 0,
  inflationRate: 0,
  federalTaxRate: 0,
  stateTaxRate: 0,
  propertyTaxRate: 0,
  // SERVICES
  daETS: { growth: 0 },
  dcm: { growth: 0 }, // TODO collect value
  deferral: {
    plannedLoadLimit: 0,
    reversePowerFlowLimit: 0,
    growth: 0,
    price: 0,
  },
  fr: {
    eou: 0,
    eod: 0,
    growth: 0,
    energyPriceGrowth: 0,
    combinedMarket: 0,
    duration: 0,
  },
  nsr: {
    growth: 0,
    duration: 0,
  },
  reliability: {
    target: 0,
    postOptimizationOnly: false,
    nu: 0, // TODO move to PV
    gamma: 0, // TODO move to PV
    maxOutageDuration: 0,
  },
  retailETS: { growth: 0 }, // TODO collect value
  objectivesSiteInformation: { ...siteInformationMetaData.getDefaultValues() },
  sr: {
    growth: 0,
    duration: 0,
  },
  userDefined: { price: 0 },
  // DERS
  technologySpecsSolarPV: [],
  technologySpecsICE: [],
  technologySpecsBattery: [],
  technologySpecsDieselGen: [],
  listOfActiveTechnologies: {
    Generator: [],
    'Energy Storage System': [],
    'Intermittent Resource': [],
  },
  // TIMESERIES ARRAYS
  deferralLoad: null,
  daPrice: null,
  srPrice: null,
  nsrPrice: null,
  frPrice: null,
  frUpPrice: null,
  frDownPrice: null,
  criticalLoad: null,
  userPowerMin: null,
  userPowerMax: null,
  userEnergyMin: null,
  userEnergyMax: null,

  retailTariffBillingPeriods: [],
  externalIncentives: [],
});

const state = getDefaultState();

const getters = {
  getListFieldById(state) {
    return (field, id) => state[field].find(x => x.id === id);
  },
  getIndexOfListFieldById(state) {
    return (field, id) => state[field].findIndex(x => x.id === id);
  },
  cloneListField(state) {
    return field => cloneDeep(state[field]);
  },
  getSolarPVById(state) {
    return id => state.technologySpecsSolarPV.find(x => x.id === id);
  },
  getSolarPVSpecsClone(state) {
    return () => cloneDeep(state.technologySpecsSolarPV);
  },
  getIndexOfSolarId(state) {
    return id => state.technologySpecsSolarPV.findIndex(x => x.id === id);
  },
  getICEById(state) {
    return id => state.technologySpecsICE.find(x => x.id === id);
  },
  getICESpecsClone(state) {
    return () => cloneDeep(state.technologySpecsICE);
  },
  getIndexOfICEId(state) {
    return id => state.technologySpecsICE.findIndex(x => x.id === id);
  },
  getDieselGenById(state) {
    return id => state.technologySpecsDieselGen.find(x => x.id === id);
  },
  getDieselGenSpecsClone(state) {
    return () => cloneDeep(state.technologySpecsDieselGen);
  },
  getIndexOfDieselGenId(state) {
    return id => state.technologySpecsDieselGen.findIndex(x => x.id === id);
  },
  getIndexOfBillingPeriodId(state) {
    return id => state.retailTariffBillingPeriods.findIndex(x => x.id === id);
  },
  getIndexOfExternalIncentiveId(state) {
    return id => state.externalIncentives.findIndex(x => x.id === id);
  },
  getBatteryById(state) {
    return id => state.technologySpecsBattery.find(x => x.id === id);
  },
  getBatterySpecsClone(state) {
    return () => cloneDeep(state.technologySpecsBattery);
  },
  getIndexOfBatteryId(state) {
    return id => state.technologySpecsBattery.findIndex(x => x.id === id);
  },
};

const mutations = {
  SET_ID(state, newId) {
    state.id = newId;
  },
  SET_NAME(state, newName) {
    state.name = newName;
  },
  SET_TYPE(state, type) {
    state.type = type;
  },
  SET_INCLUDE_POI_CONTRAINTS(state, newIncludePOIConstraints) {
    state.objectivesSiteInformation.includeInterconnectionConstraints = newIncludePOIConstraints;
  },
  SET_INCLUDE_SITE_LOAD(state) {
    let customerSited = state.objectivesRetailEnergyChargeReduction;
    customerSited = customerSited || state.objectivesRetailEnergyChargeReduction;
    customerSited = customerSited || (state.ownership === 'Customer');
    state.objectivesSiteInformation.includeSiteLoad = customerSited;
  },
  SET_INPUTS_DIRECTORY(state, newInputsDirectory) {
    state.inputsDirectory = newInputsDirectory;
  },
  SET_RESULTS_DIRECTORY(state, newResultsDirectory) {
    state.resultsDirectory = newResultsDirectory;
  },
  SET_DISCOUNT_RATE(state, newDiscountRate) {
    state.discountRate = newDiscountRate;
  },
  SET_INFLATION_RATE(state, newInflationRate) {
    state.inflationRate = newInflationRate;
  },
  SET_FEDERAL_TAX_RATE(state, newFederalTaxRate) {
    state.federalTaxRate = newFederalTaxRate;
  },
  SET_STATE_TAX_RATE(state, newStateTaxRate) {
    state.stateTaxRate = newStateTaxRate;
  },
  SET_PROPERTY_TAX_RATE(state, newPropertyTaxRate) {
    state.propertyTaxRate = newPropertyTaxRate;
  },
  SET_MAX_IMPORT_FROM_GRID(state, newChargingFromGridLimit) {
    state.objectivesSiteInformation.maxImport = newChargingFromGridLimit;
  },
  SET_MAX_EXPORT_TO_GRID(state, newDischargingToGridLimit) {
    state.objectivesSiteInformation.maxExport = newDischargingToGridLimit;
  },
  SET_COMPLETENESS_SITE_INFORMATION(state, newCompleteness) {
    state.objectivesSiteInformation.complete = newCompleteness;
  },
  SET_SITE_LOAD(state, newSiteLoad) {
    state.siteLoad = newSiteLoad;
  },
  SET_DEFERRAL_PLANNED_LOAD_LIMIT(state, newDeferralPlannedLoadLimit) {
    state.deferral.plannedLoadLimit = newDeferralPlannedLoadLimit;
  },
  SET_DEFERRAL_REVERSE_POWER_FLOW_LIMIT(state, newDeferralReversePowerFlowLimit) {
    state.deferral.reversePowerFlowLimit = newDeferralReversePowerFlowLimit;
  },
  SET_DEFERRAL_GROWTH(state, newDeferralGrowth) {
    state.deferral.growth = newDeferralGrowth;
  },
  SET_DEFERRAL_PRICE(state, newDeferralPrice) {
    state.deferral.price = newDeferralPrice;
  },
  SET_DEFERRAL_LOAD(state, newDeferralLoad) {
    state.deferralLoad = newDeferralLoad;
  },
  SET_RELIABILITY_POST_OPTIMIZATION_ONLY(state, newPostOptimizationOnly) {
    state.reliability.postOptimizationOnly = newPostOptimizationOnly;
  },
  SET_RELIABILITY_TARGET(state, newReliabilityTarget) {
    state.reliability.target = newReliabilityTarget;
  },
  SET_RELIABILITY_NU(state, newReliabilityNu) {
    state.reliability.nu = newReliabilityNu;
  },
  SET_RELIABILITY_GAMMA(state, newReliabilityGamma) {
    state.reliability.gamma = newReliabilityGamma;
  },
  SET_RELIABILITY_MAX_OUTAGE_DURATION(state, newReliabilityMaxOutageDuration) {
    state.reliability.maxOutageDuration = newReliabilityMaxOutageDuration;
  },
  SET_CRITICAL_LOAD(state, newCriticalLoad) {
    state.criticalLoad = newCriticalLoad;
  },
  SET_DA_GROWTH(state, newDAGrowth) {
    state.daETS.growth = newDAGrowth;
  },
  SET_DA_PRICE(state, newDAPrice) {
    state.daETS.price = newDAPrice;
  },
  SET_SR_GROWTH(state, newSRGrowth) {
    state.sr.growth = newSRGrowth;
  },
  SET_SR_PRICE(state, newSRPrice) {
    state.sr.price = newSRPrice;
  },
  SET_SR_DURATION(state, newSRDuration) {
    state.sr.duration = newSRDuration;
  },
  SET_NSR_GROWTH(state, newNSRGrowth) {
    state.nsr.growth = newNSRGrowth;
  },
  SET_NSR_PRICE(state, newNSRPrice) {
    state.nsr.price = newNSRPrice;
  },
  SET_NSR_DURATION(state, newNSRDuration) {
    state.nsr.duration = newNSRDuration;
  },
  SET_FR_EOU(state, newFReou) {
    state.fr.eou = newFReou;
  },
  SET_FR_EOD(state, newFReod) {
    state.fr.eod = newFReod;
  },
  SET_FR_GROWTH(state, newFRGrowth) {
    state.fr.growth = newFRGrowth;
  },
  SET_FR_ENERGY_GROWTH(state, newFREnergyGrowth) {
    state.fr.energyPriceGrowth = newFREnergyGrowth;
  },
  SET_FR_COMBINED_MARKET(state, newFRCombinedMarket) {
    state.fr.combinedMarket = newFRCombinedMarket;
  },
  SET_FR_DURATION(state, newFRDuration) {
    state.fr.duration = newFRDuration;
  },
  SET_FR_PRICE(state, newFRPrice) {
    state.fr.price = newFRPrice;
  },
  SET_FR_UP_PRICE(state, newFRUpPrice) {
    state.fr.upPrice = newFRUpPrice;
  },
  SET_FR_DOWN_PRICE(state, newFRDownPrice) {
    state.fr.downPrice = newFRDownPrice;
  },
  SET_USER_PRICE(state, newUserPrice) {
    state.userDefine.price = newUserPrice;
  },
  SET_USER_POWER_MAX(state, newUserPowerMax) {
    state.userPowerMax = newUserPowerMax;
  },
  SET_USER_POWER_MIN(state, newUserPowerMin) {
    state.userPowerMin = newUserPowerMin;
  },
  SET_USER_ENERGY_MAX(state, newUserEnergyMax) {
    state.userEnergyMax = newUserEnergyMax;
  },
  SET_USER_ENERGY_MIN(state, newUserEnergyMin) {
    state.userEnergyMin = newUserEnergyMin;
  },
  ADD_TECHNOLOGY_SPECS_SOLAR_PV(state, newSolar) {
    state.technologySpecsSolarPV.push(newSolar);
  },
  ADD_TECHNOLOGY_SPECS_ICE(state, newICE) {
    state.technologySpecsICE.push(newICE);
  },
  ADD_TECHNOLOGY_SPECS_DIESEL_GEN(state, newDieselGen) {
    state.technologySpecsDieselGen.push(newDieselGen);
  },
  ADD_TECHNOLOGY_SPECS_BATTERY(state, newBattery) {
    state.technologySpecsBattery.push(newBattery);
  },
  REPLACE_LIST_FIELD(state, payload) {
    const clonedList = getters.cloneListField(state)(payload.field);
    const index = getters.getIndexOfListFieldById(state)(payload.field, payload.id);
    clonedList[index] = payload.newListItem;
    state[payload.field] = clonedList;
  },
  RESET_LIST_OF_ACTIVE_TECHNOLOGIES(state) {
    state.listOfActiveTechnologies = getDefaultState().listOfActiveTechnologies;
  },
  ADD_TO_LIST_OF_ACTIVE_TECHNOLOGIES(state, tech) {
    state.listOfActiveTechnologies[tech.technologyType].push(tech);
  },
  REPLACE_TECHNOLOGY_SPECS_SOLAR_PV(state, payload) {
    const tmpSolarPVSpecs = getters.getSolarPVSpecsClone(state)();
    const indexMatchingId = getters.getIndexOfSolarId(state)(payload.solarId);
    tmpSolarPVSpecs[indexMatchingId] = payload.newSolar;
    state.technologySpecsSolarPV = tmpSolarPVSpecs;
  },
  REPLACE_TECHNOLOGY_SPECS_ICE(state, payload) {
    const tmpICESpecs = getters.getICESpecsClone(state)();
    const indexMatchingId = getters.getIndexOfICEId(state)(payload.iceId);
    tmpICESpecs[indexMatchingId] = payload.newICE;
    state.technologySpecsICE = tmpICESpecs;
  },
  REPLACE_TECHNOLOGY_SPECS_DIESEL_GEN(state, payload) {
    const tmpDieselGenSpecs = getters.getDieselGenSpecsClone(state)();
    const indexMatchingId = getters.getIndexOfDieselGenId(state)(payload.dieselGenId);
    tmpDieselGenSpecs[indexMatchingId] = payload.newDieselGen;
    state.technologySpecsDieselGen = tmpDieselGenSpecs;
  },
  REPLACE_TECHNOLOGY_SPECS_BATTERY(state, payload) {
    const tmpBatterySpecs = getters.getBatterySpecsClone(state)();
    const indexMatchingId = getters.getIndexOfBatteryId(state)(payload.batteryId);
    tmpBatterySpecs[indexMatchingId] = payload.newBattery;
    state.technologySpecsBattery = tmpBatterySpecs;
  },
  ACTIVATE_TECH_SOLAR_PV(state, payload) {
    const indexMatchingId = getters.getIndexOfSolarId(state)(payload.id);
    state.technologySpecsSolarPV[indexMatchingId].active = true;
  },
  ACTIVATE_TECH_BATTERY(state, payload) {
    const indexMatchingId = getters.getIndexOfBatteryId(state)(payload.id);
    state.technologySpecsBattery[indexMatchingId].active = true;
  },
  ACTIVATE_TECH_ICE(state, payload) {
    const indexMatchingId = getters.getIndexOfICEId(state)(payload.id);
    state.technologySpecsICE[indexMatchingId].active = true;
  },
  ACTIVATE_TECH_DIESEL_GEN(state, payload) {
    const indexMatchingId = getters.getIndexOfDieselGenId(state)(payload.id);
    state.technologySpecsDieselGen[indexMatchingId].active = true;
  },
  DEACTIVATE_TECH_SOLAR_PV(state, payload) {
    const indexMatchingId = getters.getIndexOfSolarId(state)(payload.id);
    state.technologySpecsSolarPV[indexMatchingId].active = false;
  },
  DEACTIVATE_TECH_BATTERY(state, payload) {
    const indexMatchingId = getters.getIndexOfBatteryId(state)(payload.id);
    state.technologySpecsBattery[indexMatchingId].active = false;
  },
  DEACTIVATE_TECH_ICE(state, payload) {
    const indexMatchingId = getters.getIndexOfICEId(state)(payload.id);
    state.technologySpecsICE[indexMatchingId].active = false;
  },
  DEACTIVATE_TECH_DIESEL_GEN(state, payload) {
    const indexMatchingId = getters.getIndexOfDieselGenId(state)(payload.id);
    state.technologySpecsDieselGen[indexMatchingId].active = false;
  },
  REMOVE_TECH_SOLAR_PV(state, payload) {
    const indexMatchingId = getters.getIndexOfSolarId(state)(payload.id);
    state.technologySpecsSolarPV.splice(indexMatchingId, 1);
  },
  REMOVE_TECH_BATTERY(state, payload) {
    const indexMatchingId = getters.getIndexOfBatteryId(state)(payload.id);
    state.technologySpecsBattery.splice(indexMatchingId, 1);
  },
  REMOVE_TECH_ICE(state, payload) {
    const indexMatchingId = getters.getIndexOfICEId(state)(payload.id);
    state.technologySpecsICE.splice(indexMatchingId, 1);
  },
  REMOVE_TECH_DIESEL_GEN(state, payload) {
    const indexMatchingId = getters.getIndexOfDieselGenId(state)(payload.id);
    state.technologySpecsDieselGen.splice(indexMatchingId, 1);
  },
  ADD_GENERATION_PROFILE_TO_TECHNOLOGY_SPECS_PV(state, payload) {
    const tmpSolarPVSpecs = getters.getSolarPVSpecsClone(state)();
    const indexMatchingId = getters.getIndexOfSolarId(state)(payload.solarId);
    tmpSolarPVSpecs[indexMatchingId].generationProfile = payload.generationProfile;
    state.technologySpecsSolarPV = tmpSolarPVSpecs;
  },

  ADD_EXTERNAL_INCENTIVE(state, newExternalIncentive) {
    state.externalIncentives.push(newExternalIncentive);
  },
  REPLACE_EXTERNAL_INCENTIVES(state, newExternalIncentives) {
    state.externalIncentives = newExternalIncentives;
  },
  REMOVE_EXTERNAL_INCENTIVE(state, id) {
    const index = getters.getIndexOfExternalIncentiveId(state)(id);
    state.externalIncentives.splice(index, 1);
  },
  REMOVE_ALL_EXTERNAL_INCENTIVES(state) {
    state.externalIncentives = [];
  },

  ADD_RETAIL_TARIFF_BILLING_PERIOD(state, newBillingPeriod) {
    state.retailTariffBillingPeriods.push(newBillingPeriod);
  },
  REPLACE_RETAIL_TARIFF_BILLING_PERIODS(state, newBillingPeriods) {
    state.retailTariffBillingPeriods = newBillingPeriods;
  },
  REMOVE_RETAIL_TARIFF_BILLING_PERIOD(state, id) {
    const index = getters.getIndexOfBillingPeriodId(state)(id);
    state.retailTariffBillingPeriods.splice(index, 1);
  },
  REMOVE_ALL_RETAIL_TARIFF_BILLING_PERIODS(state) {
    state.retailTariffBillingPeriods = [];
  },
  ADD_BATTERY_CYCLES_TO_TECHNOLOGY_SPECS_BATTERY(state, payload) {
    const tmpBatterySpecs = getters.getBatterySpecsClone(state)();
    const indexMatchingId = getters.getIndexOfBatteryId(state)(payload.batteryId);
    tmpBatterySpecs[indexMatchingId].batteryCycles = payload.batteryCycles;
    state.technologySpecsBattery = tmpBatterySpecs;
  },
  RESET_PROJECT_TO_DEFAULT(state) {
    Object.assign(state, getDefaultState());
  },
  SET_START_YEAR(state, newStartYear) {
    state.startYear = newStartYear;
  },
  SET_ANALYSIS_HORIZON_MODE(state, newAnalysisHorizonMode) {
    state.analysisHorizonMode = newAnalysisHorizonMode;
  },
  SET_ANALYSIS_HORIZON(state, newAnalysisHorizon) {
    state.analysisHorizon = newAnalysisHorizon;
  },
  SET_DATA_YEAR(state, newDataYear) {
    state.dataYear = newDataYear;
  },
  SET_GRID_LOCATION(state, newGridLocation) {
    state.gridLocation = newGridLocation;
  },
  SET_OWNERSHIP(state, newOwnership) {
    state.ownership = newOwnership;
  },
  SET_TIMESTEP(state, newTimestep) {
    state.timestep = newTimestep;
  },
  SET_OPTIMIZATION_HORIZON(state, newOptimizataionHorizon) {
    state.optimizationHorizon = newOptimizataionHorizon;
  },
  SET_OPTIMIZATION_HORIZON_NUM(state, newOptimizataionHorizonNum) {
    state.optimizationHorizonNum = newOptimizataionHorizonNum;
  },
  CHOOSE_ENERGY_STRUCTURE(state, wholesaleEnergyPrices) {
    state.energyPriceSourceWholesale = wholesaleEnergyPrices;
    if (wholesaleEnergyPrices) {
      state.objectivesDA = true;
      state.objectivesRetailEnergyChargeReduction = false;
    } else {
      state.objectivesDA = false;
      state.objectivesRetailEnergyChargeReduction = true;
    }
  },
  SELECT_OTHER_SERVICES(state, listOfServices) {
    state.listOfActiveServices = listOfServices;
    state.objectivesResilience = (listOfServices.indexOf('Reliability') > -1);
    state.objectivesBackupPower = (listOfServices.indexOf('Backup Power') > -1);
    state.objectivesRetailDemandChargeReduction = (listOfServices.indexOf('Retail Demand Charge Reduction') > -1);
    state.objectivesSR = (listOfServices.indexOf('SR') > -1);
    state.objectivesNSR = (listOfServices.indexOf('NSR') > -1);
    state.objectivesFR = (listOfServices.indexOf('FR') > -1);
    state.objectivesLoadFollowing = (listOfServices.indexOf('LF') > -1);
    state.objectivesDeferral = (listOfServices.indexOf('Deferral') > -1);
    state.objectivesUserDefined = (listOfServices.indexOf('User Defined') > -1);
  },
};

const actions = {
  setId({ commit }, newId) {
    commit('SET_ID', newId);
  },
  setName({ commit }, newName) {
    commit('SET_NAME', newName);
  },
  setType({ commit }, type) {
    commit('SET_TYPE', type);
  },
  setIncludePOIConstraints({ commit }, newIncludePOIConstraints) {
    commit('SET_INCLUDE_POI_CONTRAINTS', newIncludePOIConstraints);
  },
  setIncludeSiteLoad({ commit }) {
    commit('SET_INCLUDE_SITE_LOAD');
  },
  setInputsDirectory({ commit }, newInputsDirectory) {
    commit('SET_INPUTS_DIRECTORY', newInputsDirectory);
  },
  setResultsDirectory({ commit }, newResultsDirectory) {
    commit('SET_RESULTS_DIRECTORY', newResultsDirectory);
  },
  setDiscountRate({ commit }, newDiscountRate) {
    commit('SET_DISCOUNT_RATE', newDiscountRate);
  },
  setInflationRate({ commit }, newInflationRate) {
    commit('SET_INFLATION_RATE', newInflationRate);
  },
  setFederalTaxRate({ commit }, newFederalTaxRate) {
    commit('SET_FEDERAL_TAX_RATE', newFederalTaxRate);
  },
  setStateTaxRate({ commit }, newStateTaxRate) {
    commit('SET_STATE_TAX_RATE', newStateTaxRate);
  },
  setPropertyTaxRate({ commit }, newPropertyTaxRate) {
    commit('SET_PROPERTY_TAX_RATE', newPropertyTaxRate);
  },
  setMaxImportFromGrid({ commit }, newChargingFromGridLimit) {
    commit('SET_MAX_IMPORT_FROM_GRID', newChargingFromGridLimit);
  },
  setMaxExportToGrid({ commit }, newDischargingToGridLimit) {
    commit('SET_MAX_EXPORT_TO_GRID', newDischargingToGridLimit);
  },
  setCompletenessSiteInformation({ commit }, newCompleteness) {
    commit('SET_COMPLETENESS_SITE_INFORMATION', newCompleteness);
  },
  setSiteLoad({ commit }, newSiteLoad) {
    commit('SET_SITE_LOAD', newSiteLoad);
  },
  setDeferralPlannedLoadLimit({ commit }, newDeferralPlannedLoadLimit) {
    commit('SET_DEFERRAL_PLANNED_LOAD_LIMIT', newDeferralPlannedLoadLimit);
  },
  setDeferralReversePowerFlowLimit({ commit }, newDeferralReversePowerFlowLimit) {
    commit('SET_DEFERRAL_REVERSE_POWER_FLOW_LIMIT', newDeferralReversePowerFlowLimit);
  },
  setDeferralGrowth({ commit }, newDeferralGrowth) {
    commit('SET_DEFERRAL_GROWTH', newDeferralGrowth);
  },
  setDeferralPrice({ commit }, newDeferralPrice) {
    commit('SET_DEFERRAL_PRICE', newDeferralPrice);
  },
  setDeferralLoad({ commit }, newDeferralLoad) {
    commit('SET_DEFERRAL_LOAD', newDeferralLoad);
  },
  setReliabilityPostOptimizationOnly({ commit }, newPostOptimizationOnly) {
    commit('SET_RELIABILITY_POST_OPTIMIZATION_ONLY', newPostOptimizationOnly);
  },
  setReliabilityTarget({ commit }, newReliabilityTarget) {
    commit('SET_RELIABILITY_TARGET', newReliabilityTarget);
  },
  setReliabilityNu({ commit }, newReliabilityNu) {
    commit('SET_RELIABILITY_NU', newReliabilityNu);
  },
  setReliabilityGamma({ commit }, newReliabilityGamma) {
    commit('SET_RELIABILITY_GAMMA', newReliabilityGamma);
  },
  setReliabilityMaxOutageDuration({ commit }, newReliabilityMaxOutageDuration) {
    commit('SET_RELIABILITY_MAX_OUTAGE_DURATION', newReliabilityMaxOutageDuration);
  },
  setCriticalLoad({ commit }, newCriticalLoad) {
    commit('SET_CRITICAL_LOAD', newCriticalLoad);
  },
  setDAGrowth({ commit }, newDAGrowth) {
    commit('SET_DA_GROWTH', newDAGrowth);
  },
  setDAPrice({ commit }, newDAPrice) {
    commit('SET_DA_PRICE', newDAPrice);
  },
  setSRGrowth({ commit }, newSRGrowth) {
    commit('SET_SR_GROWTH', newSRGrowth);
  },
  setSRPrice({ commit }, newSRPrice) {
    commit('SET_SR_PRICE', newSRPrice);
  },
  setSRDuration({ commit }, newSRDuration) {
    commit('SET_SR_DURATION', newSRDuration);
  },
  setNSRGrowth({ commit }, newNSRGrowth) {
    commit('SET_NSR_GROWTH', newNSRGrowth);
  },
  setNSRPrice({ commit }, newNSRPrice) {
    commit('SET_NSR_PRICE', newNSRPrice);
  },
  setNSRDuration({ commit }, newNSRDuration) {
    commit('SET_NSR_DURATION', newNSRDuration);
  },
  setFReou({ commit }, newFReou) {
    commit('SET_FR_EOU', newFReou);
  },
  setFReod({ commit }, newFReod) {
    commit('SET_FR_EOD', newFReod);
  },
  setFRGrowth({ commit }, newFRGrowth) {
    commit('SET_FR_GROWTH', newFRGrowth);
  },
  setFREnergyGrowth({ commit }, newFREnergyGrowth) {
    commit('SET_FR_ENERGY_GROWTH', newFREnergyGrowth);
  },
  setFRCombinedMarket({ commit }, newFRCombinedMarket) {
    commit('SET_FR_COMBINED_MARKET', newFRCombinedMarket);
  },
  setFRDuration({ commit }, newFRDuration) {
    commit('SET_FR_DURATION', newFRDuration);
  },
  setFRPrice({ commit }, newFRPrice) {
    commit('SET_FR_PRICE', newFRPrice);
  },
  setFRUpPrice({ commit }, newFRUpPrice) {
    commit('SET_FR_UP_PRICE', newFRUpPrice);
  },
  setFRDownPrice({ commit }, newFRDownPrice) {
    commit('SET_FR_DOWN_PRICE', newFRDownPrice);
  },
  setUserPrice({ commit }, newUserPrice) {
    commit('SET_USER_PRICE', newUserPrice);
  },
  setUserPowerMax({ commit }, newUserPowerMax) {
    commit('SET_USER_POWER_MAX', newUserPowerMax);
  },
  setUserPowerMin({ commit }, newUserPowerMin) {
    commit('SET_USER_POWER_Min', newUserPowerMin);
  },
  setUserEnergyMax({ commit }, newUserEnergyMax) {
    commit('SET_USER_ENERGY_MAX', newUserEnergyMax);
  },
  setUserEnergyMin({ commit }, newUserEnergyMin) {
    commit('SET_USER_ENERGY_Min', newUserEnergyMin);
  },
  makeListOfActiveTechnologies({ commit }, projectSpecs) {
    commit('RESET_LIST_OF_ACTIVE_TECHNOLOGIES');
    const specs = [
      projectSpecs.technologySpecsICE,
      projectSpecs.technologySpecsDieselGen,
      projectSpecs.technologySpecsBattery,
      projectSpecs.technologySpecsSolarPV,
    ];
    flatten(specs).forEach((tech) => {
      if (tech.active) {
        commit('ADD_TO_LIST_OF_ACTIVE_TECHNOLOGIES', tech);
      }
    });
  },
  addTechnologySpecsSolarPV({ commit }, newSolar) {
    commit('ADD_TECHNOLOGY_SPECS_SOLAR_PV', newSolar);
  },
  addTechnologySpecsICE({ commit }, newICE) {
    commit('ADD_TECHNOLOGY_SPECS_ICE', newICE);
  },
  addTechnologySpecsDieselGen({ commit }, newDieselGen) {
    commit('ADD_TECHNOLOGY_SPECS_DIESEL_GEN', newDieselGen);
  },
  addTechnologySpecsBattery({ commit }, newBattery) {
    commit('ADD_TECHNOLOGY_SPECS_BATTERY', newBattery);
  },
  replaceListField({ commit }, payload) {
    commit('REPLACE_LIST_FIELD', payload);
  },
  replaceTechnologySpecsSolarPV({ commit }, payload) {
    commit('REPLACE_TECHNOLOGY_SPECS_SOLAR_PV', payload);
  },
  replaceTechnologySpecsICE({ commit }, payload) {
    commit('REPLACE_TECHNOLOGY_SPECS_ICE', payload);
  },
  replaceTechnologySpecsDieselGen({ commit }, payload) {
    commit('REPLACE_TECHNOLOGY_SPECS_DIESEL_GEN', payload);
  },
  replaceTechnologySpecsBattery({ commit }, payload) {
    commit('REPLACE_TECHNOLOGY_SPECS_BATTERY', payload);
  },
  activateTech({ commit }, payload) {
    if (payload.tag === 'ICE') {
      commit('ACTIVATE_TECH_ICE', payload);
    } else if (payload.tag === 'DieselGen') {
      commit('ACTIVATE_TECH_DIESEL_GEN', payload);
    } else if (payload.tag === 'PV') {
      commit('ACTIVATE_TECH_SOLAR_PV', payload);
    } else if (payload.tag === 'Battery') {
      commit('ACTIVATE_TECH_BATTERY', payload);
    }
  },
  deactivateTech({ commit }, payload) {
    if (payload.tag === 'ICE') {
      commit('DEACTIVATE_TECH_ICE', payload);
    } else if (payload.tag === 'DieselGen') {
      commit('DEACTIVATE_TECH_DIESEL_GEN', payload);
    } else if (payload.tag === 'PV') {
      commit('DEACTIVATE_TECH_SOLAR_PV', payload);
    } else if (payload.tag === 'Battery') {
      commit('DEACTIVATE_TECH_BATTERY', payload);
    }
  },
  removeTech({ commit }, payload) {
    if (payload.tag === 'ICE') {
      commit('REMOVE_TECH_ICE', payload);
    } else if (payload.tag === 'DieselGen') {
      commit('REMOVE_TECH_DIESEL_GEN', payload);
    } else if (payload.tag === 'PV') {
      commit('REMOVE_TECH_SOLAR_PV', payload);
    } else if (payload.tag === 'Battery') {
      commit('REMOVE_TECH_BATTERY', payload);
    }
  },
  addGenerationProfileToTechnologySpecsPV({ commit }, payload) {
    commit('ADD_GENERATION_PROFILE_TO_TECHNOLOGY_SPECS_PV', payload);
  },
  addExternalIncentive({ commit }, newExternalIncentive) {
    commit('ADD_EXTERNAL_INCENTIVE', newExternalIncentive);
  },
  replaceExternalIncentives({ commit }, newExternalIncentives) {
    commit('REPLACE_EXTERNAL_INCENTIVES', newExternalIncentives);
  },
  removeExternalIncentive({ commit }, id) {
    commit('REMOVE_EXTERNAL_INCENTIVE', id);
  },
  removeAllExternalIncentives({ commit }) {
    commit('REMOVE_ALL_EXTERNAL_INCENTIVES');
  },
  addRetailTariffBillingPeriod({ commit }, newExternalIncentive) {
    commit('ADD_RETAIL_TARIFF_BILLING_PERIOD', newExternalIncentive);
  },
  replaceRetailTariffBillingPeriods({ commit }, newBillingPeriods) {
    commit('REPLACE_RETAIL_TARIFF_BILLING_PERIODS', newBillingPeriods);
  },
  removeRetailTariffBillingPeriod({ commit }, id) {
    commit('REMOVE_RETAIL_TARIFF_BILLING_PERIOD', id);
  },
  removeAllRetailTariffBillingPeriods({ commit }) {
    commit('REMOVE_ALL_RETAIL_TARIFF_BILLING_PERIODS');
  },
  addBatteryCyclesToTechnologySpecsBattery({ commit }, payload) {
    commit('ADD_BATTERY_CYCLES_TO_TECHNOLOGY_SPECS_BATTERY', payload);
  },
  resetProjectToDefault({ commit }) {
    commit('RESET_PROJECT_TO_DEFAULT');
  },
  setStartYear({ commit }, newStartYear) {
    commit('SET_START_YEAR', newStartYear);
  },
  setAnalysisHorizonMode({ commit }, newAnalysisHorizonMode) {
    commit('SET_ANALYSIS_HORIZON_MODE', newAnalysisHorizonMode);
  },
  setAnalysisHorizon({ commit }, newAnalysisHorizon) {
    commit('SET_ANALYSIS_HORIZON', newAnalysisHorizon);
  },
  setDataYear({ commit }, newDataYear) {
    commit('SET_DATA_YEAR', newDataYear);
  },
  setGridLocation({ commit }, newGridLocation) {
    commit('SET_GRID_LOCATION', newGridLocation);
  },
  setOwnership({ commit }, newOwnership) {
    commit('SET_OWNERSHIP', newOwnership);
  },
  setTimestep({ commit }, newTimestep) {
    commit('SET_TIMESTEP', newTimestep);
  },
  setOptimizationHorizon({ commit }, newOptimizataionHorizon) {
    commit('SET_OPTIMIZATION_HORIZON', newOptimizataionHorizon);
  },
  setOptimizationHorizonNum({ commit }, newOptimizataionHorizonNum) {
    commit('SET_OPTIMIZATION_HORIZON_NUM', newOptimizataionHorizonNum);
  },
  chooseEnergyStructure({ commit }, energyPriceStructure) {
    commit('CHOOSE_ENERGY_STRUCTURE', energyPriceStructure);
  },
  selectOtherServices({ commit }, listOfServices) {
    commit('SELECT_OTHER_SERVICES', listOfServices);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
