const Home = () => {
  return (
    <>
      <div className="container-fluid">
      <h3 className="mt-2">Total calories: 900 kcal</h3>
        <div className="card-body mt-4">
          <div className="card">
            <div className="d-flex justify-content-between align-items-center">
              <div className="ms-3 mt-2">
                <h5>Breakfast</h5>
                <p>Eggs, Toast</p>
              </div>
              <div>
                <strong>600 Kcal</strong>
              </div>
              <div className="me-2">
                <button className="btn btn-primary me-2">Edit</button>
                <button className="btn btn-danger">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;