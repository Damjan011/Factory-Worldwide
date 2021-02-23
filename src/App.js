import React, { useEffect, useState } from 'react';
import DataTable from './components/DataTable';
import Loader from './components/Loader';
import RowView from './components/RowView';

const App = () => {
  const [data, setData] = useState([]);
  const [formattedData, setFormattedData] = useState([]);
  const [initialFetch, setInitialFetch] = useState(false);
  const [rowView, setRowView] = useState(20);
  const [totalCount, setTotalCount] = useState(0);

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
    setTotalCount(containerArr.length);
    setFormattedData(containerArr.slice(0, rowView));
  }

  useEffect(() => {
    formatData(data)
  }, [data, rowView])

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

      <RowView
        initialFetch={initialFetch}
        rowView={rowView}
        setRowView={setRowView}
        totalCount={totalCount} />
      <Loader
        message='Loading...'
        initialFetch={initialFetch}
      />
      <DataTable
        setFormattedData={setFormattedData}
        initialFetch={initialFetch}
        formattedData={formattedData}
      />
    </div>
  );
}

export default App;
