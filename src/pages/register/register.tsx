import { Button, Input } from '@krgaa/react-developer-burger-ui-components';
import { type FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';

import { useFormWithValidation } from '@hooks/use-form-with-validation.ts';
import { useRegisterMutation } from '@utils/api.ts';

import styles from './register.module.css';

export const RegisterPage = (): React.JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);
  const { values, handleChange, errors, isValid } = useFormWithValidation({
    name: '',
    email: '',
    password: '',
  });

  const [register] = useRegisterMutation();

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    register(values).catch((err: Error) => {
      console.error('Register user error:', err);
    });
  };

  return (
    <section className={styles.register}>
      <form noValidate onSubmit={handleSubmit} className={styles.register_form}>
        <div className={styles.register_wrapper}>
          <h2 className="text text_type_main-medium">Регистрация</h2>
          <Input
            name="name"
            onChange={handleChange}
            placeholder="Имя"
            size="default"
            type="text"
            value={values.name || ''}
            errorText={errors.name}
            error={!!errors.name}
          />
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
            Зарегистрироваться
          </Button>
        </div>

        <span className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы?{' '}
          <Link to={'/login'} className="text_color_accent">
            Войти
          </Link>
        </span>
      </form>
    </section>
  );
};
