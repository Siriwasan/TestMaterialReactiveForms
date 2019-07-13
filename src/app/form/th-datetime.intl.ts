import { Injectable } from '@angular/core';
import { MatDatepickerIntlCatalog } from '@coachcare/datepicker';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThDatetimeIntl implements MatDatepickerIntlCatalog {
  readonly changes = new Subject<void>();
  calendarLabel = 'Calendrier';
  openCalendarLabel = 'Ouvrir le calendrier';
  prevMonthLabel = 'Mois précédent';
  nextMonthLabel = 'Mois suivant';
  prevYearLabel = 'Année précédente';
  nextYearLabel = 'Année suivante';
  setToAMLabel = 'Passer à la matinée';
  setToPMLabel = 'Passer à l\'après  midi';
  switchToMinuteViewLabel = 'Passer à la vue des minutes';
  switchToHourViewLabel = 'Passer à la vue des heures';
  switchToMonthViewLabel = 'Passer à la vue des mois';
  switchToYearViewLabel = 'Passer à la vue de l\'année';
  switchToYearsViewLabel = 'Passer à la vue des années';
  buttonSubmitText = 'ตกลง';
  buttonSubmitLabel = 'Sélectionner la date du jour';
  buttonCancelText = 'ยกเลิก';
  buttonCancelLabel = 'Annuler la sélection de date';
}
