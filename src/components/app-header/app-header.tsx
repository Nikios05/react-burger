import { BurgerIcon, Logo } from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { selectUser } from '@services/user/reducer.ts';

import styles from './app-header.module.css';

export const AppHeader = (): React.JSX.Element => {
  const user = useSelector(selectUser);

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <NavLink
            to={'/'}
            className={({ isActive }) => {
              return clsx([styles.link, isActive && styles.link_active]);
            }}
          >
            {({ isActive }) => {
              return (
                <>
                  <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
                  <p className="text text_type_main-default ml-2">Конструктор</p>
                </>
              );
            }}
          </NavLink>
          <NavLink
            to={'/feed'}
            className={({ isActive }) => {
              return clsx([styles.link, 'ml-10', isActive && styles.link_active]);
            }}
          >
            {({ isActive }) => {
              return (
                <>
                  <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
                  <p className="text text_type_main-default ml-2">Лента заказов</p>
                </>
              );
            }}
          </NavLink>
        </div>
        <div className={styles.logo}>
          <Logo />
        </div>
        <NavLink
          to={'/profile'}
          className={({ isActive }) => {
            return clsx([
              styles.link,
              styles.link_position_last,
              isActive && styles.link_active,
            ]);
          }}
        >
          {({ isActive }) => {
            return (
              <>
                <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
                <p className="text text_type_main-default ml-2">
                  {user ? `${user.email}` : 'Личный кабинет'}
                </p>
              </>
            );
          }}
        </NavLink>
      </nav>
    </header>
  );
};
