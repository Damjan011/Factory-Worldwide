import React, { useEffect, useState } from 'react';

const App = () => {
  const [data, setData] = useState([]);
  const [initialFetch, setInitialFetch] = useState(false);
  //const [bigArr, setBigArr] = useState([]);
  useEffect(() => {
    fetch('https://fww-demo.herokuapp.com/')
      .then(res => res.json())
      .then(res => {
        setData(res);
        setInitialFetch(true);
      })
  }, [initialFetch]);

  const sortNames = (val) => {
    const stateArr = data.map(e => e.state).map(el => el.map(element => element.users.sort((a, b) => a.fullName - b.fullName)));
    console.log('sorttt', stateArr)
    // console.log(data)
    console.log('dataaa ', data);
    let batak = [...data];
    console.log(data)
  }

  let bigArr = [];

  useEffect(() => {
    console.log(bigArr)
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
      <button onClick={() => sortNames()}>
        ajjj
      </button>
      {
        !initialFetch &&
        <div className="loading-container">
          LOADING...
          </div>
      }
      {
        initialFetch &&
        <div className="table-container">
          <table>
            <tr>
              <th>
                Full Name
                </th>
              <th>
                Balance
                </th>
              <th>
                Active
                </th>
              <th>
                Registered
                </th>
              <th>
                State
                </th>
              <th>
                Country
                </th>
            </tr>
            {
              data.map(e =>
                e.state.map(el => (
                  el.users.map(element => {
                    let obj = {
                      fullName: element.fullName,
                      balance: element.balance,
                      isActive: '' + element.isActive,
                      registered: element.registered,
                      name: el.name,
                      country: e.country
                    }
                    bigArr.push(obj)
                    return (
                    <tr>
                      <td>
                        {element.fullName}
                      </td>
                      <td>
                        {element.balance}
                      </td>
                      <td>
                        {'' + element.isActive}
                      </td>
                      <td>
                        {element.registered}
                      </td>
                      <td>
                        {el.name}
                      </td>
                      <td>
                        {e.country}
                      </td>
                    </tr>
                  )
                    })
                ))
              )}
          </table>
        </div>
      }
    </div>
  );
}

export default App;
