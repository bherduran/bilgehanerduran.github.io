

class SearchManager {
    static searchRecipes(query, filters = {}) {
        let filteredRecipes = [...recipes]; 

       
        if (query) {
            filteredRecipes = filteredRecipes.filter(recipe => {
                const searchText = (recipe.name + ' ' + recipe.ingredients + ' ' + recipe.instructions).toLowerCase();
                return searchText.includes(query.toLowerCase());
            });
        }

    
        if (filters.category) {
            filteredRecipes = filteredRecipes.filter(recipe => 
                recipe.category.toLowerCase() === filters.category.toLowerCase()
            );
        }

       
        if (filters.cookTime) {
            filteredRecipes = filteredRecipes.filter(recipe => 
                recipe.cookTime <= parseInt(filters.cookTime)
            );
        }

        
        if (filters.favorites === 'favorites') {
            filteredRecipes = filteredRecipes.filter(recipe => recipe.isFavorite === true);
        }

        return filteredRecipes;
    }

    static updateDisplayedRecipes() {
        const query = document.getElementById('searchInput').value;
        const categoryFilter = document.getElementById('filterCategory').value;
        const timeFilter = document.getElementById('filterTime').value;
        const favoritesFilter = document.getElementById('filterFavorites').value;

        const filteredRecipes = this.searchRecipes(query, {
            category: categoryFilter,
            cookTime: timeFilter,
            favorites: favoritesFilter
        });

        const container = document.getElementById('recipesContainer');
        container.innerHTML = '';

        if (filteredRecipes.length === 0) {
            container.innerHTML = `
                <div class="no-results">
                    <p>No recipes found. Try different search terms or filters.</p>
                </div>
            `;
        } else {
            filteredRecipes.forEach(recipe => {
                const recipeElement = RecipeManager.createRecipeElement(recipe);
                container.appendChild(recipeElement);
            });
        }
    }
}


document.addEventListener('DOMContentLoaded', () => {
    
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('filterCategory');
    const timeFilter = document.getElementById('filterTime');
    const favoritesFilter = document.getElementById('filterFavorites');

    
    const filters = [searchInput, categoryFilter, timeFilter, favoritesFilter];
    filters.forEach(filter => {
        if (filter) {
            filter.addEventListener('change', () => {
                SearchManager.updateDisplayedRecipes();
            });
            
            if (filter === searchInput) {
                filter.addEventListener('input', () => {
                    SearchManager.updateDisplayedRecipes();
                });
            }
        }
    });
});


const style = document.createElement('style');
style.textContent = `
    .filter-container {
        display: flex;
        gap: 1rem;
        margin-top: 0.5rem;
    }

    .filter-container select {
        padding: 0.5rem;
        border: 1px solid #ddd;
        border-radius: var(--border-radius);
        background-color: white;
        flex: 1;
    }

    .filter-container select:hover {
        border-color: var(--primary-color);
    }

    .no-results {
        text-align: center;
        padding: 2rem;
        color: #666;
        grid-column: 1 / -1;
    }

    @media (max-width: 768px) {
        .filter-container {
            flex-direction: column;
            gap: 0.5rem;
        }
    }
`;
document.head.appendChild(style);
