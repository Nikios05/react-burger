import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Outlet } from 'react-router-dom';

import { BurgerConstructor } from '@components/burger-constructor/burger-constructor.tsx';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients.tsx';
import { useGetIngredientsQuery } from '@services/ingredients/api.ts';

import styles from './home.module.css';

export const Home = (): React.JSX.Element => {
  const { isLoading, error } = useGetIngredientsQuery();

  if (error) {
    if ('status' in error) {
      const errMsg = 'error' in error ? error.error : JSON.stringify(error.data);

      return <p>{errMsg}</p>;
    }

    return <p>{error.message}</p>;
  }

  return (
    <div className={styles.home}>
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>

      {!isLoading ? (
        <main className={`${styles.main} pl-5 pr-5`}>
          <Outlet />

          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </main>
      ) : (
        <Preloader />
      )}
    </div>
  );
};
