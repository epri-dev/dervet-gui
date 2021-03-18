import { TS_USER_ENERGY_MAX } from '@/models/Project/constants';
import TimeSeriesBase from './TimeSeriesBase';

class UserEnergyMaxTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('Aggregate Energy Max (kWh)', data);
    this.pageAttributes = this.getPageAttributes('components', 'objectives', 'userDefined');
    this.tsName = TS_USER_ENERGY_MAX;
  }
}

export default UserEnergyMaxTimeSeries;