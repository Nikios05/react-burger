import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { selectUser } from '@services/user/reducer.ts';

import styles from './app-header.module.css';

export const AppHeader = (): React.JSX.Element => {
  const location = useLocation();
  const isHomePath = location.pathname === '/';
  const isFeedPath = location.pathname === '/feed';
  const isProfilePath = location.pathname.startsWith('/profile');

  const user = useSelector(selectUser);

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <Link
            to={'/'}
            className={clsx([styles.link, isHomePath && styles.link_active])}
          >
            <BurgerIcon type={isHomePath ? 'primary' : 'secondary'} />
            <p className="text text_type_main-default ml-2">Конструктор</p>
          </Link>
          <Link
            to={'/feed'}
            className={clsx([styles.link, 'ml-10', isFeedPath && styles.link_active])}
          >
            <ListIcon type={isFeedPath ? 'primary' : 'secondary'} />
            <p className="text text_type_main-default ml-2">Лента заказов</p>
          </Link>
        </div>
        <div className={styles.logo}>
          <Logo />
        </div>
        <Link
          to={'/profile'}
          className={clsx([
            styles.link,
            styles.link_position_last,
            isProfilePath && styles.link_active,
          ])}
        >
          <ProfileIcon type={isProfilePath ? 'primary' : 'secondary'} />
          <p className="text text_type_main-default ml-2">
            {user ? `${user.email}` : 'Личный кабинет'}
          </p>
        </Link>
      </nav>
    </header>
  );
};
