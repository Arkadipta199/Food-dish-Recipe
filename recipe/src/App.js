import React, {useEffect,useState} from 'react';
import Recipe from "./Recipe";
import './App.css';

const App = () =>{          
  const APP_ID = "91e16a0a";
  const APP_KEYS = "1f27be742cb95a440305e5505289ab5e";

  const [recipes, set_recipes] = useState([]);
  const [search, set_search] = useState('');
  const [query, set_query] = useState('chicken');
  useEffect(() => { 
    get_recipes();
  }, [query]);


  const get_recipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEYS}`
    );                            
    const data = await response.json();
    set_recipes(data.hits); 
    console.log(data.hits);
  };

  const update_search = e => {
    set_search(e.target.value);
  }

  const get_search = e =>{
    e.preventDefault();
    set_query(search)
  }
  
  return (  
    <div className = "App">
      <form onSubmit = {get_search}  className = "search-form">
        <input className = "search-bar" type= "text" value = {search} onChange ={update_search}/>
        <button className = "search-button" type = "submit">
            Search
        </button>
      </form>
      <div  className = "recipes">
      {recipes.map(recipe =>( 
      <Recipe 
      key = {recipe.recipe.label}
      title = {recipe.recipe.label} 
      calories = {recipe.recipe.calories}
      image = {recipe.recipe.image}
      ingredients = {recipe.recipe.ingredients}
      />
       ))};
       </div>
    </div>
    );
  };
export default App;
