import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import ProjectFieldMetadata from '@/models/Project/FieldMetadata';
import { optionsYN } from '@/models/Project/constants';
import { SHARED_DYNAMIC_FIELDS, createSharedHardcodedMetadata } from '@/models/Project/TechnologySpecs/sharedConstants';
import { TECH_SPECS_DIESEL } from '@/router/constants';

const DieselGen = 'DieselGen';

// TODO parse these from schema
const SIZING_ALLOWED_VALUES = [
  {
    value: true,
    label: 'Have DER-VET determine the capacity of the diesel generators',
  },
  {
    value: false,
    label: 'Known size',
  },
];

const DYNAMIC_FIELDS = [
  ...SHARED_DYNAMIC_FIELDS,
  'capitalCost',
  'capitalCostPerkW',
  'efficiency',
  'fixedOMCostIncludingExercise',
  'fuelCost',
  'includeSizeLimits',
  'minimumPower',
  'numGenerators',
  'ratedCapacity',
  'ratedCapacityMaximum',
  'ratedCapacityMinimum',
  'replacementCost',
  'replacementCostPerkW',
  'shouldSize',
  'variableOMCost',
];

const sharedHardcodedMetadata = createSharedHardcodedMetadata('diesel generator');

export default class TechnologySpecsDieselGenMetadata {
  constructor(arg) {
    Object.assign(this, arg);
  }

  operateOnDynamicFields(callback) {
    return _.mapValues(_.pick(this, DYNAMIC_FIELDS), callback);
  }

  getDefaultValues() {
    return {
      active: true,
      complete: null,
      errorList: [],
      id: uuidv4(),
      path: TECH_SPECS_DIESEL,
      tag: DieselGen,
      technologyType: 'Generator',
      ...this.operateOnDynamicFields(f => f.defaultValue),
    };
  }

  toValidationSchema() {
    return this.operateOnDynamicFields(f => f.toValidationSchema());
  }

  // to be removed in favor of getMetadataFromSchema
  static getHardcodedMetadata() {
    return new TechnologySpecsDieselGenMetadata({
      capitalCost: new ProjectFieldMetadata({
        displayName: 'Capital Cost',
        isRequired: true,
        minValue: 0,
        type: Number,
        unit: '$ / generator',
        description: 'What is the capital cost of each diesel generator?',
      }),
      capitalCostPerkW: new ProjectFieldMetadata({
        displayName: 'Capital Cost per kW',
        isRequired: true,
        minValue: 0,
        type: Number,
        unit: '$ / kW-generator',
        description: 'What is the capital cost per kW for each internal combustion engine?',
      }),
      efficiency: new ProjectFieldMetadata({
        displayName: 'Efficiency',
        isRequired: true,
        minValue: 0,
        type: Number,
        unit: 'gallons / kWh',
        description: 'How many gallons of fuel does it take to generate 1 kWh of electricity? No variable efficiency is considered at this stage.',
      }),
      fixedOMCostIncludingExercise: new ProjectFieldMetadata({
        displayName: 'Fixed O&M Cost, including exercise',
        isRequired: true,
        minValue: 0,
        type: Number,
        unit: '$ / kW-year',
        description: 'What is the cost of fixed operations and maintenance, including the non-fuel expenses from exercising the diesel generator?',
      }),
      fuelCost: new ProjectFieldMetadata({
        displayName: 'Fuel Cost',
        isRequired: true,
        minValue: 0,
        type: Number,
        unit: '$ / gallon',
        description: 'What is the price of fuel (constant over analysis horizon)?',
      }),
      includeSizeLimits: new ProjectFieldMetadata({
        displayName: 'Include limits on capacity sizing?',
        isRequired: true,
        type: Boolean,
        allowedValues: optionsYN,
        description: 'Advanced sizing settings.',
      }),
      minimumPower: new ProjectFieldMetadata({
        displayName: 'Minimum Power',
        isRequired: true,
        minValue: 0,
        type: Number,
        unit: 'kW',
        description: 'What is the mimimum power the diesel generator is capable of safely producing?',
      }),
      numGenerators: new ProjectFieldMetadata({
        displayName: 'Number of Generators to Install',
        isRequired: true,
        minValue: 1, // differs from schema; want gt 0
        type: 'int',
        description: 'What is the number of diesel generators to install?',
      }),
      ratedCapacity: new ProjectFieldMetadata({
        displayName: 'Rated Capacity',
        isRequired: true,
        minValue: 0,
        type: Number,
        unit: 'kW / generator',
        description: 'What is the rated capacity of the diesel generator?',
      }),
      ratedCapacityMaximum: new ProjectFieldMetadata({
        displayName: 'Rated Capacity Maximum',
        description: 'Upper limit on power capacity when optimally sizing',
        isRequired: false, // based on if sizing
        minValue: 0,
        type: Number,
        unit: 'kW / generator',
      }),
      ratedCapacityMinimum: new ProjectFieldMetadata({
        displayName: 'Rated Capacity Minimum',
        description: 'Lower limit on power capacity when optimally sizing (this does not set a minimum generating power during operation)',
        isRequired: false, // based on if sizing
        minValue: 0,
        type: Number,
        unit: 'kW / generator',
      }),
      replacementCost: new ProjectFieldMetadata({
        displayName: 'Replacement Cost',
        isRequired: true,
        minValue: 0,
        type: Number,
        unit: '$ / generator',
        description: 'Total cost of replacing the old internal combustion engine at its end of life (recurring cost based on replacement year)',
      }),
      replacementCostPerkW: new ProjectFieldMetadata({
        displayName: 'Replacement Cost per kW',
        isRequired: true,
        minValue: 0,
        type: Number,
        unit: '$ / kW-generator',
        description: 'Replacement Cost per kW of rated capacity',
      }),
      shouldSize: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Sizing',
        isRequired: true,
        type: Boolean,
        unit: null,
        description: null,
        allowedValues: SIZING_ALLOWED_VALUES,
      }),
      variableOMCost: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Variable O&M cost',
        isRequired: true,
        minValue: 0,
        type: Number,
        unit: '$ / MWh',
        description: 'What is the cost of variable operations and maintenance for each MWh of AC energy delivered?',
        allowedValues: null,
      }),
      ...sharedHardcodedMetadata,
    });
  }
}