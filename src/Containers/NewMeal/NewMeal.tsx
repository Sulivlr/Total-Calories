import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import {Meals} from '../../constants';
import axiosApi from '../../../axiosApi';

const NewMeal = () => {
  const [meal, setMeal] = useState({
    time: '',
    description: '',
    calories: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const {mealId} = useParams();


  const onFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {name, value} = event.target;
    setMeal((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const apiMeal = {
        ...meal,
        calories: parseInt(meal.calories),
      };

      if (mealId) {
        await axiosApi.put(`/meals/${mealId}.json`, apiMeal);
      } else {
        await axiosApi.post(`/meals.json`, apiMeal);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h4>{mealId ? 'Edit' : 'Add meal'}</h4>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="time">Select a Meal</label>
          <select
            value={meal.time}
            onChange={onFieldChange}
            name="time"
            id="time"
            className="form-select"
          >
            <option value="">Select a Meal.....</option>
            {Meals.map((meal) => (
              <option key={meal.url} value={meal.url}>{meal.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="time">Description</label>
          <textarea
            value={meal.description}
            onChange={onFieldChange}
            name="description"
            id="description"
            className="form-control"
            required
          />
          <div className="form-group">
            <label htmlFor="time">Calories</label>
            <input
              value={meal.calories}
              onChange={onFieldChange}
              name="calories"
              id="calories"
              className="form-control"
              required
            />
          </div>
          <button
            className="btn btn-success mt-2"
            type="submit"
            disabled={false}
            >
            Save
          </button>
        </div>

      </form>
    </>
  );
};

export default NewMeal;