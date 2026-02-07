import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export const approvalSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .required('Title is required'),
  description: Yup.string()
    .min(10, 'Description must be at least 10 characters')
    .required('Description is required'),
  type: Yup.string().required('Approval type is required'),
  amount: Yup.number()
    .when('type', {
      is: (val: string) => val === 'FINANCIAL' || val === 'EXPENSE',
      then: (schema) => schema.required('Amount is required').min(0, 'Amount must be positive'),
      otherwise: (schema) => schema.notRequired(),
    }),
});

