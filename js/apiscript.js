const fetchMealsByType = (mealType) => {
  let foodType = document.getElementById("foodType");
  foodType.innerText = mealType + " Food Items";
  // Construct the API URL based on the provided meal type
  const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealType}`;
  console.log(apiUrl);

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => displayMeals(data.meals))
    .catch((error) => console.error("Error fetching meals: ", error));
};

fetchMealsByType("beef");

const displayMeals = (meals) => {
  console.log("Meal data received: ", meals);
  // Reset the card container to display new meals
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  // Generate the card container with the fetched meals
  meals.forEach((meal) => {
    const mealCard = document.createElement("div");
    mealCard.classList =
      "card card-compact bg-base-100 w-auto shadow-xl rounded-none";

    mealCard.innerHTML = `
        <figure>
          <img style="clip-path: polygon(0% 0%, 100% 0, 100% 85%, 51% 100%, 0 85%);" 
               src="${meal.strMealThumb}" 
               alt="Image of ${meal.strMeal}" />
        </figure>
        <div class="card-body">
          <h2 class="card-title block text-center -mt-3">${meal.strMeal}</h2>
          <p class="text-slate-500 text-xs text-center">${
            meal.strIngredient1
          }/${meal.strIngredient2}/${meal.strIngredient3}</p>
          <p title="${meal.strInstructions}">${meal.strInstructions.slice(
      0,
      100
    )}...</p>
          <div class="divider my-0"></div>
          <div class="mx-auto">
            <a href="${meal.strSource}" target="_blank"
                    class="btn btn-outline text-orange-600 h-10 min-h-10">
              VIEW DETAILS
            </a>
          </div>
        </div>
      `;
    cardContainer.appendChild(mealCard);
  });
};
