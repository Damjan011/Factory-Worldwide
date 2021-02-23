import React, { useEffect, useState } from 'react';
import DataTable from './components/DataTable';

const App = () => {
  const [data, setData] = useState([]);
  const [formattedData, setFormattedData] = useState([]);
  const [initialFetch, setInitialFetch] = useState(false);

  useEffect(() => {
    fetch('https://fww-demo.herokuapp.com/')
      .then(res => res.json())
      .then(res => {
        setData(res);
        setInitialFetch(true);
      })
  }, [initialFetch]);

  const formatData = (arr) => {
    let containerArr = [];
    let dataObj;
    arr.map(e =>
      e.state.map(el => (
        el.users.map(element => {
          dataObj = {
            fullName: element.fullName,
            balance: element.balance,
            isActive: '' + element.isActive,
            registered: element.registered,
            name: el.name,
            country: e.country
          }
          containerArr.push(dataObj)
        })
      ))
    )
    setFormattedData(containerArr);
  }

  const sortData = (arr, key) => {
    return arr.sort((a, b) => {
      if (a[key] < b[key]) {
        return -1;
      }
      if (a[key] > b[key]) {
        return 1;
      }
      return 0;
    });
  }

  useEffect(() => {
    formatData(data)
  }, [data])

  return (
    <div className="view">
      <div className="heading-area">
        <div className="main-label">
          <p>Factory Worldwide</p>
        </div>
        <div className="main-text">
          <p>Test assignment</p>
        </div>
      </div>
      {
        !initialFetch &&
        <div className="loading-container">
          <div className="loader">
          </div>
          <div class="loading-label">
            <p>
              LOADING...
          </p>
          </div>
        </div>
      }
      <DataTable initialFetch={initialFetch} formattedData={formattedData} />

    </div>
  );
}

export default App;

{/* // onClick={() => {
//   setFormattedData(prev => sortData([...prev], 'fullName') */}

