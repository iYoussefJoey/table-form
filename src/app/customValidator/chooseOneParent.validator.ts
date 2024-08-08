import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function chooseOneParentValidator(): ValidatorFn {
  return (FormArray: AbstractControl): ValidationErrors | null => {
    const familyMembers = FormArray.value;
    const fatherCount = familyMembers.filter(
      (member: { familymember: string }) => member.familymember == 'Father'
    ).length;
    const motherCount = familyMembers.filter(
      (member: { familymember: string }) => member.familymember == 'Mother'
    ).length;
    
    const errors: any = {};
    if (fatherCount > 1) {
        errors.multipleFathers = ' Please choose only one Father';
    }
    if (motherCount > 1) {
        errors.multipleMothers = ' Please choose only one Mother';
    }
    return Object.keys(errors).length ? errors : null;
  };
}


