import { clsx } from 'clsx';

import { IngredientCard } from '@components/ingredient-card/ingredient-card.tsx';

import type { TIngredient } from '@utils/types';

import styles from './ingredient-section.module.css';

type TBurgerIngredientsProps = {
  title: string;
  ingredients: TIngredient[];
  onClick: (ingredient: TIngredient) => void;
};

export const IngredientSection = ({
  title,
  ingredients,
  onClick,
}: TBurgerIngredientsProps): React.JSX.Element => {
  return (
    <section className={styles.ingredient_section}>
      <h2 className="text text_type_main-medium">{title}</h2>

      <ul className={clsx([styles.ingredients_list, 'pt-6 pr-4 pb-10 pl-4'])}>
        {ingredients.map((ingredient) => {
          return (
            <li key={ingredient._id} onClick={() => onClick(ingredient)}>
              <IngredientCard ingredient={ingredient} count={1} />
            </li>
          );
        })}
      </ul>
    </section>
  );
};
