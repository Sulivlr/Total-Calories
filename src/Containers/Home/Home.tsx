import {useCallback, useEffect, useMemo, useState} from 'react';
import axiosApi from '../../../axiosApi';
import {ApiMeals, Meal} from '../../types';
import {useNavigate, useParams} from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';

const Home = () => {

  const navigate = useNavigate();
  const [meals, setMeals] = useState<Meal[]>([]);
  const {mealId} = useParams();
  const [isFetching, setIsFetching] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchMeals = useCallback(async () => {
    try {
      setIsFetching(true);
      const {data: apiMeals} = await axiosApi.get<ApiMeals | null>(`/meals.json`);

      if (apiMeals) {
        setMeals(Object.keys(apiMeals).map((id) => ({
          id,
          ...apiMeals[id]
        })));
      } else {
        setMeals([]);
      }
    } finally {
      setIsFetching(false);
    }
  }, []);

  useEffect(() => {
    void fetchMeals();
  }, [fetchMeals]);

  const totalCalories = useMemo(() => meals.reduce((acc, meal) => {
    return acc + meal.calories;
  }, 0), [meals]);

  const deleteMeal = async (id: string) => {
    try {
      setIsDeleting(true);
      await axiosApi.delete(`/meals/${id}.json`);
      void fetchMeals();
    } catch (error) {
      console.error('something went wrong', error);
    } finally {
      setIsDeleting(false);
    }
  };


  return (
    <>
      <div className="container-fluid">
        <h2 className="mt-2">Total calories: {totalCalories}</h2>
        {isFetching ? (
          <Spinner/>
        ) : meals.map((meal) => (
          <div className="card-body mt-4">
            <div key={meal.id} className="card">
              <div className="d-flex justify-content-between align-items-center">
                <div className="ms-3 mt-2">
                  <h5>{meal.time}</h5>
                  <p>{meal.description}</p>
                </div>
                <div>
                  <strong>{meal.calories}</strong>
                </div>
                <div className="me-2">
                  <button className="btn btn-primary me-2">Edit</button>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteMeal(meal.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;