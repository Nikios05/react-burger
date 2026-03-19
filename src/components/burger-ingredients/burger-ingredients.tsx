import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { useMemo, useState } from 'react';

import { IngredientDetails } from '@components/ingredient-details/ingredient-details.tsx';
import { IngredientSection } from '@components/ingredient-section/ingredient-section.tsx';
import { Modal } from '@components/modal/modal.tsx';

import type { TIngredient } from '@utils/types';

import styles from './burger-ingredients.module.css';

type TBurgerIngredientsProps = {
  ingredients: TIngredient[];
};

export const BurgerIngredients = ({
  ingredients,
}: TBurgerIngredientsProps): React.JSX.Element => {
  const [showDetails, setShowDetails] = useState(false);
  const [selectIngredient, setSelectIngredient] = useState<TIngredient | null>(null);

  const getIngredientNameByType = (type: TIngredient['type']): string => {
    switch (type) {
      case 'bun':
        return 'Булки';
      case 'main':
        return 'Начинка';
      case 'sauce':
        return 'Соусы';
      default:
        return 'Не известный ингредиент';
    }
  };

  const ingredientsByType = useMemo(() => {
    const sortedIngredients: Record<TIngredient['type'], TIngredient[]> = {};

    ingredients.forEach((ingredient) => {
      if (!sortedIngredients[ingredient.type]) {
        sortedIngredients[ingredient.type] = [];
      }

      sortedIngredients[ingredient.type].push(ingredient);
    });

    return Object.entries(sortedIngredients).map(([type, ingredients]) => ({
      title: getIngredientNameByType(type),
      ingredients,
    }));
  }, [ingredients]);

  return (
    <section className={styles.burger_ingredients}>
      <nav>
        <ul className={styles.menu}>
          <Tab
            value="bun"
            active={true}
            onClick={() => {
              /* TODO */
            }}
          >
            Булки
          </Tab>
          <Tab
            value="main"
            active={false}
            onClick={() => {
              /* TODO */
            }}
          >
            Начинки
          </Tab>
          <Tab
            value="sauce"
            active={false}
            onClick={() => {
              /* TODO */
            }}
          >
            Соусы
          </Tab>
        </ul>
      </nav>

      {showDetails && selectIngredient && (
        <Modal
          title="Детали ингредиента"
          onClose={() => {
            setShowDetails(false);
            setSelectIngredient(null);
          }}
        >
          <IngredientDetails ingredient={selectIngredient} />
        </Modal>
      )}

      <div className={clsx([styles.wrapper, 'custom-scroll'])}>
        {ingredientsByType.map((item, index) => {
          return (
            <IngredientSection
              key={`${item.title}_${index}`}
              title={item.title}
              ingredients={item.ingredients}
              onClick={(ingredient) => {
                setShowDetails(true);
                setSelectIngredient(ingredient);
              }}
            />
          );
        })}
      </div>
    </section>
  );
};
