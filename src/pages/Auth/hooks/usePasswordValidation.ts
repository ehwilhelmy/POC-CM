import { useMemo } from 'react';

export interface PasswordRule {
  key: string;
  label: string;
  met: boolean;
  children?: PasswordRule[];
}

export interface PasswordValidation {
  rules: PasswordRule[];
  allValid: boolean;
}

export function usePasswordValidation(
  password: string,
  confirmPassword?: string,
): PasswordValidation {
  return useMemo(() => {
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*]/.test(password);
    const typesMet = [hasLower, hasUpper, hasNumber, hasSpecial].filter(Boolean).length;

    const rules: PasswordRule[] = [
      {
        key: 'length',
        label: 'At least 12 characters',
        met: password.length >= 12,
      },
      {
        key: 'types',
        label: 'At least 3 of the following:',
        met: typesMet >= 3,
        children: [
          { key: 'lower', label: 'Lower case letters (a-z)', met: hasLower },
          { key: 'upper', label: 'Upper case letters (A-Z)', met: hasUpper },
          { key: 'numbers', label: 'Numbers (0-9)', met: hasNumber },
          { key: 'special', label: 'Special characters (!@#$%^&*)', met: hasSpecial },
        ],
      },
    ];

    let allValid = rules.every((r) => r.met);

    if (confirmPassword !== undefined) {
      const matchRule: PasswordRule = {
        key: 'match',
        label: 'Passwords match',
        met: password.length > 0 && password === confirmPassword,
      };
      rules.push(matchRule);
      allValid = allValid && matchRule.met;
    }

    return { rules, allValid };
  }, [password, confirmPassword]);
}
