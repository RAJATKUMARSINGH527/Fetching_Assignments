const categoryBtn=document.getElementById("CategoryData");
categoryBtn.addEventListener('click',getCategoryData);
const ingrediantBtn=document.getElementById('IngredientData');
//  add add event listner
ingrediantBtn.addEventListener('click',getIngrediantData);
// Function to fetch data for a specific category (e.g., Seafood)
async function getCategoryData(){
    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood');
        const data = await response.json();
        // print the data
        console.log(data);
    }catch (error) {
        console.log('Something went wrong',error);
    }
}
// Function to fetch data for a specific ingredient (e.g., chicken_breast)
async function getIngrediantData(){
    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast');
        const data = await response.json();
        console.log(data);
    }catch (error) {
        console.log('Something went wrong',error);
    }
}