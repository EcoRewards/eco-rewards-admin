import React from "react";

export const SchemesPage: React.FC = () => {
  return (
    <div className="container-fluid">

      <h1 className="h3 mb-2 text-gray-800">Schemes</h1>
      <p className="mb-4">DataTables is a third party plugin that is used to generate the demo table below. For more
        information about DataTables, please visit the <a rel="noopener noreferrer" target="_blank" href="https://datatables.net">official
          DataTables documentation</a>.
      </p>

      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">DataTables Example</h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered" id="dataTable">
              <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>Tiger Nixon</td>
                <td>System Architect</td>
              </tr>
              <tr>
                <td>Garrett Winters</td>
                <td>Accountant</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
