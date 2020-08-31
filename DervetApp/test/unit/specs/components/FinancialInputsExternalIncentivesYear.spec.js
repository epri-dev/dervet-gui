import FinancialInputsExternalIncentivesYear from '@/components/Wizard/FinancialInputsExternalIncentivesYear';
import mountVueElement from './helper';

describe('FinancialInputsExternalIncentivesYear', () => {
  it('should render properly', () => {
    const vm = mountVueElement(FinancialInputsExternalIncentivesYear, {});
    expect(vm.$el.querySelector('h3').textContent).to.contain('External Incentives: Add Data for Year');
  });
});
