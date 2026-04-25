import { Button, Input } from '@krgaa/react-developer-burger-ui-components';
import { type FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';

import { useFormWithValidation } from '@hooks/use-form-with-validation.ts';
import { useLoginMutation } from '@utils/api.ts';

import type { IUser } from '@services/user/reducer.ts';

import styles from './login.module.css';

export const LoginPage = (): React.JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);
  const [login] = useLoginMutation();

  const { values, handleChange, errors, isValid } = useFormWithValidation({
    email: '',
    password: '',
  });

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    login(values as IUser).catch((err: Error) => {
      console.error('Login user error:', err);
    });
  };

  return (
    <section className={styles.login}>
      <form noValidate onSubmit={handleSubmit} className={styles.login_form}>
        <div className={styles.login_wrapper}>
          <h2 className="text text_type_main-medium">Вход</h2>
          <Input
            name="email"
            onChange={handleChange}
            placeholder="E-mail"
            size="default"
            type="email"
            value={values.email || ''}
            errorText={errors.name}
            error={!!errors.name}
          />
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
          <Button disabled={!isValid} size="medium" type="primary" htmlType={'submit'}>
            Войти
          </Button>
        </div>

        <div className={styles.login_footer}>
          <span className="text text_type_main-default text_color_inactive">
            Вы - новый пользователь?{' '}
            <Link to={'/register'} className="text_color_accent">
              Зарегистрироваться
            </Link>
          </span>
          <span className="text text_type_main-default text_color_inactive">
            Забыли пароль?{' '}
            <Link to={'/forgot-password'} className="text_color_accent">
              Восстановить пароль
            </Link>
          </span>
        </div>
      </form>
    </section>
  );
};
