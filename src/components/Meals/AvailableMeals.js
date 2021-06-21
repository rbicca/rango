import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import styles from './AvailableMeals.module.css';


  
const AvailableMeals = () => {

  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(()=>{

    const fetchMeals = async () =>{
      const response = await fetch('https://sktodo.firebaseio.com/meals.json');

      if(!response.ok){
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      const loadedMeals = [];
      for(const key in responseData){
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };

      fetchMeals().catch( error =>{
        setIsLoading(false);
        setError(error.message);  
      });

  },[]);

    const mealsList = meals.map( m =>
        <MealItem key={m.id}  id={m.id} name={m.name} description={m.description} price={m.price}/>
    );

      if(isLoading){
        return (
          <section className={styles.MealsLoading}>
            <p>Loading...</p>
          </section>
        );
      }

      if(error){
        return(
          <section className={styles.MealsError}>
            <p>{error}</p>
          </section>
        );
      }

    return(
            <section className={styles.meals}>
                <Card>
                  <ul>{ mealsList }</ul>
                </Card>
            </section>
    );
}

export default AvailableMeals;