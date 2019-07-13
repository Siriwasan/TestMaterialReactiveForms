import { MomentDateAdapter } from '@coachcare/datepicker';


export class CustomDateAdapter extends MomentDateAdapter {

  getFirstDayOfWeek(): number {
    return 3;
  }
}
