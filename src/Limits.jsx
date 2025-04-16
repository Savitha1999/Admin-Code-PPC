// import React from 'react'

// export default function Limits() {
//   return (
//     <div>Limits</div>
//   )
// }




import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Limits = () => {
  return (
    <div className="container mt-4">
      {/* Form 1 */}
      <div className="mb-4">
        <h1 className="h3">Set Daily Usage Limit to All Users</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="allUsersLimit" className="form-label">
              Set Limit:
            </label>
            <input
              type="number"
              className="form-control"
              id="allUsersLimit"
              placeholder="Enter limit"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>

      {/* Form 2 */}
      <div className="mb-4">
        <h1 className="h3">Set Daily Limit to FREE Users</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="freeUsersLimit" className="form-label">
              Free User Limit:
            </label>
            <input
              type="number"
              className="form-control"
              id="freeUsersLimit"
              placeholder="Enter limit"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>

      {/* Form 3 */}
      <div className="mb-4">
        <h1 className="h3">Set Daily Limit to PAID Users</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="paidUsersLimit" className="form-label">
              Paid User Limit:
            </label>
            <input
              type="number"
              className="form-control"
              id="paidUsersLimit"
              placeholder="Enter limit"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>

      {/* Table */}
      <div className="mb-4">
        <h1 className="h3">RESTRICT DAILY CONTACT LIMITS</h1>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Limit &gt;= 40</th>
              <th>Limit &gt;= 60</th>
              <th>Limit &gt;= 80</th>
              <th>Limit &gt;= 100</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>10</td>
              <td>5</td>
              <td>3</td>
              <td>0</td>
              <td>
                <button className="btn btn-success btn-sm">Activate</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Limits;
