// Get the search form and the results container
const searchForm = document.getElementById('search-form');
const resultsContainer = document.getElementById('results');

// Get the "Close" button and the recipe details element
const closeRecipeDetails = document.getElementById('close-recipe-details');
const recipeDetails = document.getElementById('recipe-details');

// Add an event listener to the search form to handle the submit event
searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Get the search query from the input field
  const query = searchForm.querySelector('input[name="q"]').value;

  // Show the loading indicator
  document.getElementById('loading').classList.remove('hidden');

  // Search for recipes using the Edamam Recipe Search API
  try {
    const response = await axios.get('https://api.edamam.com/search', {
      params: {
        q: query,
        app_id: 'da20fc71',
        app_key: 'dfc4de07d9bf253d80c8fd92f9ed894a',
        to: 10,
      },
    });

    // Hide the loading indicator
    document.getElementById('loading').classList.add('hidden');

    // Clear the results container
    resultsContainer.innerHTML = '';

    // Display the search results
    response.data.hits.forEach((recipe) => {
      const recipeElement = document.createElement('div');
      recipeElement.classList.add('recipe');

      const titleElement = document.createElement('h3');
      titleElement.classList.add('recipe-title');
      titleElement.textContent = recipe.recipe.label;
      recipeElement.appendChild(titleElement);

      const ingredientsElement = document.createElement('p');
      ingredientsElement.classList.add('recipe-ingredients');
      ingredientsElement.textContent = recipe.recipe.ingredientLines.join(', ');
      recipeElement.appendChild(ingredientsElement);

      const linkElement = document.createElement('a');
      linkElement.classList.add('recipe-link');
      linkElement.textContent = 'View Recipe';
      linkElement.target = '_blank'; // Open the link in a new tab
      linkElement.href = recipe.recipe.url;
      recipeElement.appendChild(linkElement);

      // Add an event listener to the "View Recipe" link to display the recipe details
      linkElement.addEventListener('click', () => {
        // Populate the recipe details element with the recipe data
        document.getElementById('recipe-title').textContent = recipe.recipe.label;
        document.getElementById('recipe-ingredients').textContent = recipe.recipe.ingredientLines.join('\n');
        document.getElementById('recipe-link').href = recipe.recipe.url;

        // Show the recipe details element
        recipeDetails.classList.remove('hidden');
      });

      // Add the recipe element to the results container
      resultsContainer.appendChild(recipeElement);
    });

  } catch (error) {
    console.error(error);
    // Hide the loading indicator
    document.getElementById('loading').classList.add('hidden');
  }
});

// Add an event listener to the "Close" button to hide the recipe details element
closeRecipeDetails.addEventListener('click', () => {
  recipeDetails.classList.add('hidden');
});

window.addEventListener("load", function() {
    document.getElementById("loading").style.display = "block";
  });
  
  window.onload = function() {
    document.getElementById("loading").style.display = "none";
  }
  
