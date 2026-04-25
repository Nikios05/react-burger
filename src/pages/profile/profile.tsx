import { Button, Input } from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { type FormEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

import { useFormWithValidation } from '@hooks/use-form-with-validation.ts';
import { type IUser, selectUser } from '@services/user/reducer.ts';
import { useLogoutMutation, useUpdateUserMutation } from '@utils/api.ts';

import styles from './profile.module.css';

export const ProfilePage = (): React.JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);
  const [showControls, setShowControls] = useState(false);

  const location = useLocation();
  const isProfilePath = location.pathname === '/profile';

  const [logout] = useLogoutMutation();
  const [updateUser] = useUpdateUserMutation();

  const user = useSelector(selectUser);
  const name = user?.name ?? '';
  const email = user?.email ?? '';

  const { values, handleChange, errors, isValid, resetValues } = useFormWithValidation({
    name,
    email,
    password: '',
  });

  const logoutHandler = (): void => {
    logout().catch((err: Error) => {
      console.error('Failed logout app:', err);
    });
  };

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    updateUser(values as IUser)
      .then(() => {
        setShowControls(false);
      })
      .catch((err: Error) => {
        console.error('Failed update user data:', err);
      });
  };

  const handleCancel = (): void => {
    resetValues();
  };

  useEffect(() => {
    if (values.name !== name || values.email !== email || values.password) {
      setShowControls(true);
    } else {
      setShowControls(false);
    }
  }, [values]);

  return (
    <section className={clsx(['p-4', styles.profile])}>
      <div className={styles.left_column}>
        <ul className={styles.nav_list}>
          <li className={styles.nav_item}>
            <NavLink
              to={'/profile'}
              end
              className={({ isActive }) => {
                return clsx([
                  'text text_type_main-medium text_color_inactive',
                  isActive && styles.nav_item_active,
                ]);
              }}
            >
              Профиль
            </NavLink>
          </li>
          <li className={styles.nav_item}>
            <NavLink
              to={'/profile/orders'}
              end
              className={({ isActive }) => {
                return clsx([
                  'text text_type_main-medium text_color_inactive',
                  isActive && styles.nav_item_active,
                ]);
              }}
            >
              История заказов
            </NavLink>
          </li>
          <li className={styles.nav_item}>
            <button onClick={logoutHandler}>
              <span className="text text_type_main-medium text_color_inactive">
                Выход
              </span>
            </button>
          </li>
        </ul>

        <p
          className={clsx([
            'text text_type_main-default text_color_inactive',
            styles.profile_text_info,
          ])}
        >
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>

      {isProfilePath ? (
        <form noValidate onSubmit={handleSubmit}>
          <div className={styles.profile_inputs}>
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
            {showControls && (
              <div>
                <Button
                  size="medium"
                  type="secondary"
                  htmlType={'button'}
                  onClick={handleCancel}
                >
                  Отмена
                </Button>
                <Button
                  disabled={!isValid}
                  size="medium"
                  type="primary"
                  htmlType={'submit'}
                >
                  Сохранить
                </Button>
              </div>
            )}
          </div>
        </form>
      ) : (
        <Outlet />
      )}
    </section>
  );
};
