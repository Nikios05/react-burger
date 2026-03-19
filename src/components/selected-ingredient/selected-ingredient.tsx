import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';

import type { TIngredient } from '@utils/types.ts';

import styles from './selected-ingredient.module.css';

type SelectedIngredientProps = {
  ingredient: TIngredient;
  type?: 'top' | 'bottom';
  isLocked?: boolean;
};

export const SelectedIngredient = ({
  ingredient,
  type,
  isLocked,
}: SelectedIngredientProps): React.JSX.Element => {
  return (
    <div
      className={clsx('pl-8', isLocked ? 'pr-4' : 'pr-2', styles.selected_ingredient)}
    >
      {!isLocked && <DragIcon type="primary" className={styles.icon} />}

      <ConstructorElement
        isLocked={isLocked}
        price={ingredient.price}
        text={ingredient.name}
        thumbnail={ingredient.image}
        type={type}
      />
    </div>
  );
};
