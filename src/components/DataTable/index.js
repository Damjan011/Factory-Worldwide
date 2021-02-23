import React, {useRef, useState, useMemo } from 'react';
import ArrowUp from  '../../assets/images/arrow-bold-top@2x.png';

const DataTable = ({ initialFetch, formattedData }) => {
  const [inputValue, setInputValue] = useState('');
  const ref = useRef();
  const useSortableData = (items, config = null) => {
    const [sortConfig, setSortConfig] = useState(config);
    const sortedItems = useMemo(() => {
      let sortableItems = [...items];
      if(inputValue === '') {
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
      let newcopy = [...items]
      const filterData = (arr) => {
        return arr.filter(e => e[sortConfig.key].toLowerCase().includes(inputValue));
      }
      sortableItems = filterData(newcopy);
      return sortableItems;
    }
    }, [items, sortConfig]);
    const requestSort = (key) => {
      let direction = 'ascending';
      if (
        sortConfig &&
        sortConfig.key === key &&
        sortConfig.direction === 'ascending'
      ) {
        direction = 'descending';
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
            <th>
                <div className="th-inner">
              <p>Full Name</p>
              <div onClick={() => {requestSort('fullName')
            console.log(ref.current.value)}}
              className={`${getClassNamesFor('fullName')} img-wrapper`}>
              <img src={ArrowUp} className="arrow" alt="Arrow indicator" />
              </div>
              </div>
              <input onChange={e => {
                setInputValue(e.target.value.toLowerCase());
                requestSort('fullName')
                }} ref={ref}></input>
            
          </th>
            <th onClick={() => requestSort('balance')}
              className={getClassNamesFor('balance')}>
                <div className="th-inner">
              <p>Balance</p>
              <img src={ArrowUp} className="arrow" alt="Arrow indicator" />
              </div>

              <input onChange={e => {
                setInputValue(e.target.value.toLowerCase());
                requestSort('balance');
                }} ref={ref}></input>
            
          </th>
            <th onClick={() => requestSort('isActive')}
              className={getClassNamesFor('isActive')}>
                <div className="th-inner">
              <p>Active</p>
              <img src={ArrowUp} className="arrow" alt="Arrow indicator" />
              </div>
          </th>
            <th onClick={() => requestSort('registered')}
              className={getClassNamesFor('registered')}>
                <div className="th-inner">
              <p>Registered</p>
              <img src={ArrowUp} className="arrow" alt="Arrow indicator" />
              </div>
          </th>
            <th onClick={() => requestSort('name')}
              className={getClassNamesFor('name')}>
                <div className="th-inner">
              <p>State</p>
              <img src={ArrowUp} className="arrow" alt="Arrow indicator" />
              </div>
          </th>
            <th onClick={() => requestSort('country')}
              className={getClassNamesFor('country')}>
                <div className="th-inner">
              <p>Country</p>
              <img src={ArrowUp} className="arrow" alt="Arrow indicator" />
              </div>
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
            })}
        </table>
      </div>
    )
  }
  return null;
}

export default DataTable;