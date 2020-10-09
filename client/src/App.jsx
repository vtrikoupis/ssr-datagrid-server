import React from "react";
import ReactDOM from "react-dom";
import DataGrid from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';

// todo 1: fetch these from /grid/:id/cols
const columns = ['CompanyName', 'City', 'State', 'Phone', 'Fax'];


const App = () => {
  return (
    <DataGrid
      // todo 2: fetch this from /grid/:id/rows
      dataSource="https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/data/customers.json"
      defaultColumns={columns}
      showBorders={true}
    />
  )
};

ReactDOM.render(<App />, document.getElementById("app"));
