import { Counter } from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';

import { Price } from '@components/price/price.tsx';

import type { TIngredient } from '@utils/types';

import styles from './ingredient-card.module.css';

type TBurgerIngredientsProps = {
  ingredient: TIngredient;
  count?: number;
};

export const IngredientCard = ({
  ingredient,
  count,
}: TBurgerIngredientsProps): React.JSX.Element => {
  return (
    <section className={styles.ingredient_card}>
      {count && <Counter count={count} size="default" />}

      <div className="pl-4 pr-4">
        <div className={styles.ingredient_image}>
          <img src={ingredient.image} alt="ingredient-image" />
        </div>

        <Price price={ingredient.price} />
      </div>

      <h4 className={clsx([styles.ingredient_name, 'text text_type_main-default'])}>
        {ingredient.name}
      </h4>
    </section>
  );
};
