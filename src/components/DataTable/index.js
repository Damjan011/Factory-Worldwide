import React, { useRef, useState, useMemo } from 'react';
import ArrowUp from '../../assets/images/arrow-bold-top@2x.png';
import NoData from '../NoData';
import './style.css';

const DataTable = ({ initialFetch, formattedData }) => {
  const [inputValue, setInputValue] = useState('');
  const [noData, setNoData] = useState(false);

  const ref = useRef();
  const useSortableData = (items, config = null) => {
    const [sortConfig, setSortConfig] = useState(config);
    const sortedItems = useMemo(() => {
      let sortableItems = [...items];
      if (inputValue.toString() === '') {
        setNoData(false)
        if (sortConfig !== null) {
          sortableItems.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
              return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
              return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
          });
        }
        return sortableItems;
      } else {
        let newCopy = [...items]
        sortableItems = newCopy.filter(e => e[sortConfig.key].toLowerCase().includes(inputValue));
        if (sortableItems.length === 0) {
          setNoData(true)
        }
        return sortableItems;
      }
    }, [items, sortConfig]);
    const requestSort = (key, isInput) => {
      let direction = 'ascending';
      if (
        sortConfig &&
        sortConfig.key === key &&
        sortConfig.direction === 'ascending'
      ) {
        direction = 'descending';
      }
      if (isInput) {
        direction = '';
      }
      setSortConfig({ key, direction });
    };
    return { items: sortedItems, requestSort, sortConfig };
  };
  const { items, requestSort, sortConfig } = useSortableData(formattedData);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };
  if (initialFetch) {
    return (
      <div className="table-container">
        <table>
          <tr>
            <th style={{ width: '243px' }}>
              <div className="th-inner">
                <p>Full Name</p>
                <div onClick={() => requestSort('fullName')}
                  className={`${getClassNamesFor('fullName')} img-wrapper`}>
                  <img src={ArrowUp} className="arrow" alt="Arrow indicator" />
                </div>
              </div>
              <input onChange={e => {
                setInputValue(e.target.value.toLowerCase());
                requestSort('fullName', true);
              }} ref={ref}></input>
            </th>
            <th style={{ width: '137px' }}>
              <div className="th-inner">
                <p>Balance</p>
                <div onClick={() => requestSort('balance')}
                  className={`${getClassNamesFor('balance')} img-wrapper`}>
                  <img src={ArrowUp} className="arrow" alt="Arrow indicator" />
                </div>
              </div>
              <input onChange={e => {
                setInputValue(e.target.value.toLowerCase());
                requestSort('balance', true);
              }} ref={ref}></input>
            </th>
            <th style={{ width: '123px' }}>
              <div className="th-inner">
                <p>Active</p>
                <div onClick={() => requestSort('isActive')}
                  className={`${getClassNamesFor('isActive')} img-wrapper`}>
                  <img src={ArrowUp} className="arrow" alt="Arrow indicator" />
                </div>
              </div>
              <input onChange={e => {
                setInputValue(e.target.value.toLowerCase());
                requestSort('isActive', true);
              }} ref={ref}></input>
            </th>
            <th style={{ width: '225px' }}>
              <div className="th-inner">
                <p>Registered</p>
                <div onClick={() => requestSort('registered')}
                  className={`${getClassNamesFor('registered')} img-wrapper`}>
                  <img src={ArrowUp} className="arrow" alt="Arrow indicator" />
                </div>
              </div>
              <input onChange={e => {
                setInputValue(e.target.value.toLowerCase());
                requestSort('registered', true);
              }} ref={ref}></input>
            </th>
            <th style={{ width: '177px' }}>
              <div className="th-inner">
                <p>State</p>
                <div onClick={() => requestSort('name')}
                  className={`${getClassNamesFor('name')} img-wrapper`}>
                  <img src={ArrowUp} className="arrow" alt="Arrow indicator" />
                </div>
              </div>
              <input onChange={e => {
                setInputValue(e.target.value.toLowerCase());
                requestSort('name', true);
              }} ref={ref}></input>
            </th>
            <th style={{ width: '140px' }}>
              <div className="th-inner">
                <p>Country</p>
                <div onClick={() => requestSort('country')}
                  className={`${getClassNamesFor('country')} img-wrapper`}>
                  <img src={ArrowUp} className="arrow" alt="Arrow indicator" />
                </div>
              </div>
              <input onChange={e => {
                setInputValue(e.target.value.toLowerCase());
                requestSort('country', true);
              }} ref={ref}></input>
            </th>
          </tr>
          {
            items.map(el => {
              return (
                <tr>
                  <td>
                    {el.fullName}
                  </td>
                  <td>
                    {el.balance}
                  </td>
                  <td>
                    {'' + el.isActive}
                  </td>
                  <td>
                    {el.registered}
                  </td>
                  <td>
                    {el.name}
                  </td>
                  <td>
                    {el.country}
                  </td>
                </tr>
              )
            })
          }
        </table>
        <NoData
          noData={noData}
        />
      </div>
    )
  }
  return null;
}

export default DataTable;