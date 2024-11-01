import Layout from './components/Layout/Layout';
import {Route, Routes} from 'react-router-dom';
import Home from './Containers/Home/Home';
import EditMeal from './Containers/EditMeal/EditMeal';
import NewMeal from './Containers/NewMeal/NewMeal';

const App = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/new-meal" element={<NewMeal/>}/>
          <Route path="/meal/:id/edit" element={<EditMeal/>}/>
          <Route path="*" element={<h1>Page Doesn't Exist</h1>}/>
        </Routes>
      </Layout>
    </>
  );
};

export default App;
