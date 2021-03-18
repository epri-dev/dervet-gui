import { TS_USER_POWER_MAX } from '@/models/Project/constants';
import TimeSeriesBase from './TimeSeriesBase';

class UserPowerMaxTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('POI: max export (kW)', data);
    this.pageAttributes = this.getPageAttributes('components', 'objectives', 'userDefined');
    this.tsName = TS_USER_POWER_MAX;
  }

  validate(expectedRowCount) {
    // parent class validate must return no errors before extra validation occurs
    const errorMsgArray = [super.validate(expectedRowCount)];
    const defaultValidate = this.formatErrorMsgArray(errorMsgArray);
    if (defaultValidate !== '') { return defaultValidate; }
    // extra validation specific to this class
    errorMsgArray.push(this.invalidCheckValuesDontCrossZero().errorMsg);
    return this.formatErrorMsgArray(errorMsgArray);
  }
}

export default UserPowerMaxTimeSeries;
