import _, { sortBy } from 'lodash';
import { IRecipe } from 'types/types';

const DEFAULT_DESCRIPTION =
  'This is where a description would go...if we HAD one! ' +
  'It would tell you what you can expect from this recipe.';

const setDefaultDescription = (recipe: IRecipe) => ({
  ...recipe,
  description: recipe.description || DEFAULT_DESCRIPTION,
});

const sortDirections = (recipe: IRecipe) => ({
  ...recipe,
  directions: sortBy(recipe.directions, ['index']),
});

const hydrateRecipes = (recipes: IRecipe[]) => {
  return _.chain(recipes)
    .map(setDefaultDescription)
    .map(sortDirections)
    .value();
};

export { hydrateRecipes };
