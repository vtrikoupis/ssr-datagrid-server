import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import DataGrid, { Editing } from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';



const App = () => {
  const [data, setData] = useState([])
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const startingToEdit = (e) => {
    // cell is in focus
    // we can get the values for that row before updating anything
    const { _id, uid, name, role, email, modules, details } = e.data
    const intendedCellToEdit = e.column.dataField;
    /*  Should the api be updated after each event or should a button "Save changes" write updates in batch?
        in the first option, should there be a debounce maybe so that we can poll multiple writes, for example every 10 seconds?
    */

  }

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/users")
      .then(res => res.json())
      .then(
        (result) => {
          setData(result)
          setIsLoaded(true);
        }, (error) => {
          setError(error)
          setIsLoaded(true)
        })
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <DataGrid
          dataSource={data}
          showBorders={true}
          onEditingStart={(e) => startingToEdit(e)}


        >
          <Editing
            mode="cell"
            allowUpdating={true} />
        </DataGrid>
      </div>
    )
  }

};

ReactDOM.render(<App />, document.getElementById("app"));
