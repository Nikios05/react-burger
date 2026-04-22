import { Button, Input } from '@krgaa/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';

import { useFormWithValidation } from '@hooks/use-form-with-validation.ts';
import { useForgotPasswordMutation } from '@utils/api.ts';

import type { FormEvent } from 'react';

import styles from './forgot-password.module.css';

export const ForgotPasswordPage = (): React.JSX.Element => {
  const { values, handleChange, errors, isValid } = useFormWithValidation({
    email: '',
  });
  const navigate = useNavigate();

  const [forgotPassword] = useForgotPasswordMutation();

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    forgotPassword(values.email)
      .then(async () => {
        localStorage.setItem('resetPasswordCheck', 'true');
        await navigate('/reset-password');
      })
      .catch((err: Error) => {
        console.error('Forgot password error:', err);
      });
  };

  return (
    <section className={styles.forgot_password}>
      <form noValidate onSubmit={handleSubmit} className={styles.forgot_password_form}>
        <div className={styles.forgot_password_wrapper}>
          <h2 className="text text_type_main-medium">Восстановление пароля</h2>
          <Input
            name="email"
            onChange={handleChange}
            placeholder="E-mail"
            size="default"
            type="email"
            value={values.email || ''}
            errorText={errors.email}
            error={!!errors.email}
          />
          <Button disabled={!isValid} size="medium" type="primary" htmlType={'submit'}>
            Восстановить
          </Button>
        </div>

        <span className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?{' '}
          <Link to={'/login'} className="text_color_accent">
            Войти
          </Link>
        </span>
      </form>
    </section>
  );
};
