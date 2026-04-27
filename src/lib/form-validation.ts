export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  website: string; // honeypot
}

export interface AdmissionsFormData {
  parentName: string;
  email: string;
  phone: string;
  studentGrade: string;
  message: string;
  website: string; // honeypot
}

export interface FormErrors {
  [key: string]: string;
}

export function validateContactForm(data: ContactFormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.firstName.trim()) errors.firstName = 'First name is required';
  if (!data.lastName.trim()) errors.lastName = 'Last name is required';

  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!data.subject) errors.subject = 'Please select a subject';
  if (!data.message.trim()) errors.message = 'Message is required';

  return errors;
}

export function validateAdmissionsForm(data: AdmissionsFormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.parentName.trim()) errors.parentName = 'Parent/Guardian name is required';

  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!data.phone.trim()) errors.phone = 'Phone number is required';
  if (!data.studentGrade) errors.studentGrade = 'Please select a grade level';

  // Message is optional for admissions form

  return errors;
}

export function isHoneypotFilled(honeypotValue: string): boolean {
  return honeypotValue.trim().length > 0;
}
