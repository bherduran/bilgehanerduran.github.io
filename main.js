
if (!window.recipes) {
    window.recipes = JSON.parse(localStorage.getItem('recipes')) || [];
}

let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];


function saveToStorage() {
    localStorage.setItem('recipes', JSON.stringify(recipes));
    localStorage.setItem('favorites', JSON.stringify(favorites));
}


function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}


function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}



const modal = document.getElementById('recipeModal');
const addRecipeBtn = document.getElementById('addRecipeBtn');
const closeBtn = document.querySelector('.close');
const recipeForm = document.getElementById('recipeForm');


addRecipeBtn.addEventListener('click', () => {
    modal.style.display = 'block';
    
    recipeForm.reset();
    document.getElementById('recipeId').value = ''; 
});


closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});


window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});


document.getElementById('recipeForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    try {
       
        const recipeData = {
            name: document.getElementById('recipeName').value.trim(),
            category: document.getElementById('recipeCategory').value,
            cookTime: parseInt(document.getElementById('cookTime').value),
            ingredients: document.getElementById('ingredients').value.trim(),
            instructions: document.getElementById('instructions').value.trim(),
            image: document.getElementById('recipeImage').value.trim() || 'assets/img/default-recipe.jpg'
        };

       
        if (!recipeData.name || !recipeData.ingredients || !recipeData.instructions) {
            alert('Please fill in all required fields');
            return;
        }

        const recipeId = document.getElementById('recipeId').value;

        let savedRecipe;
        if (recipeId) {
         
            savedRecipe = RecipeManager.updateRecipe(recipeId, recipeData);
            if (savedRecipe) {
                console.log('Recipe updated successfully:', savedRecipe);
            }
        } else {
            
            savedRecipe = RecipeManager.addRecipe(recipeData);
            console.log('New recipe added successfully:', savedRecipe);
        }

      
        if (savedRecipe) {
           
            this.reset();
            document.getElementById('recipeId').value = '';
            
          
            const modal = document.getElementById('recipeModal');
            modal.style.display = 'none';

            
            modal.querySelector('h2').textContent = 'Add New Recipe';

           
            RecipeManager.displayRecipes();
        }
    } catch (error) {
        console.error('Error saving recipe:', error);
        alert('There was an error saving the recipe. Please try again.');
    }
});
