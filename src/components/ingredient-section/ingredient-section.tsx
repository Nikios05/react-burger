import { clsx } from 'clsx';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { IngredientCard } from '@components/ingredient-card/ingredient-card.tsx';
import { getSelectedIngredientsCountMap } from '@services/selected-ingredients/recuder.ts';

import type { TIngredient } from '@utils/types';

import styles from './ingredient-section.module.css';

type TBurgerIngredientsProps = {
  title: string;
  ingredients: TIngredient[];
};

export const IngredientSection = ({
  title,
  ingredients,
}: TBurgerIngredientsProps): React.JSX.Element => {
  const selectedCountMap = useSelector(getSelectedIngredientsCountMap);
  const navigate = useNavigate();

  const ingredientOpen = (ingredient: TIngredient): void => {
    void navigate(`/ingredients/${ingredient._id}`);
  };

  return (
    <section className={styles.ingredient_section}>
      <h2 className="text text_type_main-medium">{title}</h2>

      <ul className={clsx([styles.ingredients_list, 'pt-6 pr-4 pb-10 pl-4'])}>
        {ingredients.map((ingredient) => {
          return (
            <li key={ingredient._id} onClick={() => ingredientOpen(ingredient)}>
              <IngredientCard
                ingredient={ingredient}
                count={selectedCountMap[ingredient._id]}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
};
