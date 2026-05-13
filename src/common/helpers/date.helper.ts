import moment from 'moment';
import dateConfig from '../../config/datetime.config';

class Dates {
  public static now = () => {
    return moment().utcOffset(dateConfig.timeZone).toDate();
  };

  public static format = (pattern: string) => {
    return moment().format(pattern);
  };
}

export default Dates;
