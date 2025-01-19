class RecipeManager {
    static addRecipe(recipeData) {
        const recipe = {
            id: generateId(),
            ...recipeData,
            createdBy: 'bherduran',
            createdAt: '2025-01-19 14:20:11',
            comments: [],
            isFavorite: false
        };
        
        recipes.push(recipe);
        saveToStorage();
        this.displayRecipes();
        return recipe;
    }

    static editRecipe(id) {
    
        const recipe = recipes.find(r => r.id === id);
        if (!recipe) {
            console.error('Recipe not found:', id);
            return;
        }

       
        const modal = document.getElementById('recipeModal');
        const form = document.getElementById('recipeForm');
        
        if (!modal || !form) {
            console.error('Modal or form elements not found');
            return;
        }

        try {
            
            document.getElementById('recipeId').value = recipe.id;
            document.getElementById('recipeName').value = recipe.name;
            document.getElementById('recipeCategory').value = recipe.category;
            document.getElementById('cookTime').value = recipe.cookTime;
            document.getElementById('ingredients').value = recipe.ingredients;
            document.getElementById('instructions').value = recipe.instructions;
            document.getElementById('recipeImage').value = recipe.image || '';

        
            const modalTitle = modal.querySelector('h2');
            if (modalTitle) {
                modalTitle.textContent = 'Edit Recipe';
            }

          
            modal.style.display = 'block';
        } catch (error) {
            console.error('Error setting form values:', error);
        }
    }

    static updateRecipe(id, recipeData) {
        const index = recipes.findIndex(recipe => recipe.id === id);
        if (index !== -1) {
           
            const existingRecipe = recipes[index];
            recipes[index] = {
                ...existingRecipe,          
                ...recipeData,              
                id: existingRecipe.id,      
                comments: existingRecipe.comments, 
                isFavorite: existingRecipe.isFavorite, 
                updatedBy: 'bherduran',
                updatedAt: '2025-01-19 14:24:30'
            };
            saveToStorage();
            this.displayRecipes();
            return recipes[index];
        }
        return null;
    }

    static deleteRecipe(id) {
        const index = recipes.findIndex(recipe => recipe.id === id);
        if (index !== -1) {
            if (confirm('Are you sure you want to delete this recipe?')) {
                recipes.splice(index, 1);
                saveToStorage();
                this.displayRecipes();
            }
        }
    }

    static toggleFavorite(id) {
        const recipe = recipes.find(recipe => recipe.id === id);
        if (recipe) {
            recipe.isFavorite = !recipe.isFavorite;
            saveToStorage();
            this.displayRecipes();
        }
    }

    static addComment(id, commentText) {
        if (!commentText.trim()) {
            alert('Please enter a comment');
            return;
        }

        const recipe = recipes.find(recipe => recipe.id === id);
        if (recipe) {
            recipe.comments.push({
                id: generateId(),
                text: commentText.trim(),
                author: 'bherduran',
                date: '2025-01-19 14:20:11'
            });
            saveToStorage();
            this.displayRecipes();

           
            const commentInput = document.getElementById(`comment-${id}`);
            if (commentInput) {
                commentInput.value = '';
            }
        }
    }

   static createRecipeElement(recipe) {
    const element = document.createElement('div');
    element.className = 'recipe-card';
    element.innerHTML = `
        <img src="${recipe.image || 'assets/img/default-recipe.jpg'}" alt="${recipe.name}" class="recipe-image">
        <div class="recipe-content">
            <h3>${recipe.name}</h3>
            <p class="recipe-info"><i class="fas fa-clock"></i> ${recipe.cookTime} mins</p>
            <p class="recipe-info"><i class="fas fa-tag"></i> ${recipe.category}</p>
            
            <div class="recipe-details">
                <div class="ingredients-section">
                    <h4>Ingredients:</h4>
                    <pre class="ingredients-text">${recipe.ingredients}</pre>
                </div>
                <div class="instructions-section">
                    <h4>Instructions:</h4>
                    <pre class="instructions-text">${recipe.instructions}</pre>
                </div>
            </div>

            <div class="recipe-actions">
                <button class="btn-favorite ${recipe.isFavorite ? 'active' : ''}" onclick="RecipeManager.toggleFavorite('${recipe.id}')">
                    <i class="fas fa-heart"></i>
                    ${recipe.isFavorite ? 'Favorited' : 'Favorite'}
                </button>
                <button class="btn-edit" onclick="RecipeManager.editRecipe('${recipe.id}')">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn-delete" onclick="RecipeManager.deleteRecipe('${recipe.id}')">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>

            <div class="comments-section">
                <h4>Comments (${recipe.comments.length})</h4>
                <div class="comments-list">
                    ${recipe.comments.map(comment => `
                        <div class="comment">
                            <p>${comment.text}</p>
                            <small>By ${comment.author} on ${formatDate(comment.date)}</small>
                        </div>
                    `).join('')}
                </div>
                <div class="add-comment">
                    <input type="text" id="comment-${recipe.id}" placeholder="Add a comment">
                    <button onclick="RecipeManager.addComment('${recipe.id}', document.getElementById('comment-${recipe.id}').value)">
                        Add Comment
                    </button>
                </div>
            </div>
        </div>
    `;
    return element;
}

    static displayRecipes() {
        const container = document.getElementById('recipesContainer');
        if (!container) return;
        
        container.innerHTML = '';
        
        if (recipes.length === 0) {
            container.innerHTML = '<div class="no-recipes">No recipes available. Add your first recipe!</div>';
            return;
        }

        recipes.forEach(recipe => {
            const recipeElement = this.createRecipeElement(recipe);
            container.appendChild(recipeElement);
        });
    }
}
