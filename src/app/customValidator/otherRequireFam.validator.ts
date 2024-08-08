import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export function otherFamMemberRequired(): ValidatorFn{
    return (control:AbstractControl) : ValidationErrors | null =>{
        const group = control as FormGroup
        const otherFamMember = group.get('familymember')?.value
        const relationToStudent = group.get('relationToStudent')?.value

        if(otherFamMember == 'Other' && !relationToStudent.value){
            return {required: true}
        }
        return null
}
}
