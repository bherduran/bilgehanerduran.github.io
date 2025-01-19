class FavoritesManager {
    static toggleFavorite(recipeId) {
        const index = favorites.indexOf(recipeId);
        if (index === -1) {
            favorites.push(recipeId);
        } else {
            favorites.splice(index, 1);
        }
        saveToStorage();
        RecipeManager.displayRecipes();
    }

    static getFavorites() {
        return recipes.filter(recipe => favorites.includes(recipe.id));
    }
}