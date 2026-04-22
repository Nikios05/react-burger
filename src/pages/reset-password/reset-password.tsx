import { Button, Input } from '@krgaa/react-developer-burger-ui-components';
import { type FormEvent, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import { useFormWithValidation } from '@hooks/use-form-with-validation.ts';
import { useResetPasswordMutation } from '@utils/api.ts';

import styles from './reset-password.module.css';

export const ResetPasswordPage = (): React.JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);
  const { values, handleChange, errors, isValid } = useFormWithValidation({
    password: '',
    code: '',
  });
  const navigate = useNavigate();

  const [resetPassword] = useResetPasswordMutation();

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    resetPassword({ password: values.password, token: values.code })
      .then(async () => {
        localStorage.removeItem('resetPasswordCheck');
        await navigate('/login');
      })
      .catch((err: Error) => {
        console.error('Reset password error:', err);
      });
  };

  if (!localStorage.getItem('resetPasswordCheck')) {
    return <Navigate to={'/forgot-password'} replace />;
  }

  return (
    <section className={styles.reset_password}>
      <form noValidate onSubmit={handleSubmit} className={styles.reset_password_form}>
        <div className={styles.reset_password_wrapper}>
          <h2 className="text text_type_main-medium">Восстановление пароля</h2>
          <Input
            icon={showPassword ? 'HideIcon' : 'ShowIcon'}
            name="password"
            onChange={handleChange}
            onIconClick={() => setShowPassword(!showPassword)}
            placeholder="Пароль"
            size="default"
            type={showPassword ? 'text' : 'password'}
            value={values.password || ''}
            errorText={errors.password}
            error={!!errors.password}
          />
          <Input
            name="code"
            onChange={handleChange}
            placeholder="Введите код из письма"
            size="default"
            type="text"
            value={values.code || ''}
            errorText={errors.code}
            error={!!errors.code}
          />
          <Button disabled={!isValid} size="medium" type="primary" htmlType={'submit'}>
            Сохранить
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
