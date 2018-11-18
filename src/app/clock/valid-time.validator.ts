import { AbstractControl } from '@angular/forms';

export function ValidTimeValidator(control: AbstractControl) {
  const time = control.value;

  const h = isCorrect(time.hours);
  const m = isCorrect(time.minutes);
  const s = isCorrect(time.seconds);

  if (!h && !m && !s) {
    return { validTime: true };
  }

  return null;
}

function isCorrect(time) {
    if (time) {
      const value = parseInt('' + time, 10);
      return value > 0;
    }

    return false;
}

