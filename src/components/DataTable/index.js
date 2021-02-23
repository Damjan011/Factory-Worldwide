import React from 'react';

const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config);
  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
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

const DataTable = ({ initialFetch, formattedData }) => {
  let arr = formattedData
  const { items, requestSort, sortConfig } = useSortableData(arr);
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
            <th onClick={() => requestSort('fullName')}
              className={getClassNamesFor('fullName')}>
              Full Name
          </th>
            <th onClick={() => requestSort('balance')}
              className={getClassNamesFor('balance')}>
              Balance
          </th>
            <th onClick={() => requestSort('isActive')}
              className={getClassNamesFor('isActive')}>
              Active
          </th>
            <th onClick={() => requestSort('registered')}
              className={getClassNamesFor('registered')}>
              Registered
          </th>
            <th onClick={() => requestSort('name')}
              className={getClassNamesFor('name')}>
              State
          </th>
            <th onClick={() => requestSort('country')}
              className={getClassNamesFor('country')}>
              Country
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