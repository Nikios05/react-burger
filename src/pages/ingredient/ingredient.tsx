import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { IngredientDetails } from '@components/ingredient-details/ingredient-details.tsx';
import { Modal } from '@components/modal/modal.tsx';
import {
  closeIngredientInfo,
  showIngredientInfo,
} from '@services/ingredient-info/action.ts';
import { useGetIngredientsQuery } from '@services/ingredients/api.ts';

export const Ingredient = (): React.JSX.Element => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { data: ingredients = [] } = useGetIngredientsQuery();
  const dispatch = useDispatch();

  const isModal = (location.state as { background?: boolean })?.background === true;

  useEffect(() => {
    if (id && ingredients.length > 0) {
      const findIngredient = ingredients.find((ingredient) => ingredient._id === id);
      if (findIngredient) {
        dispatch(showIngredientInfo(findIngredient));
      } else {
        void navigate('/');
      }
    }
  }, [ingredients, id]);

  if (isModal) {
    return (
      <Modal
        title="Детали ингредиента"
        onClose={() => {
          dispatch(closeIngredientInfo());
          void navigate('/');
        }}
      >
        <IngredientDetails />
      </Modal>
    );
  }

  return (
    <div className={'mt-30'}>
      <IngredientDetails />
    </div>
  );
};
