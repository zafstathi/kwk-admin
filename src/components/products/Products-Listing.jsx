import { Link } from "react-router-dom";
import Spinner from "../Spinner";

function ProductsListing(props) {
    const data = props.data
console.log("dataaa",data);

    return (
        <div className="row mb-5">
          <div className="col-md-12 col-sm-12 col-xs-12">
            <div className="card">
              <div className="card-body col-sm-12 col-xs-12">
              <div className="row ">
                  <div className="col-md-12 col-sm-12">
                    <h1>Products <i className="batch-icon batch-icon-users"></i></h1>
                 
                  </div>
                </div>
                <div className="table-responsive">
                <table
                  id="datatable-1"
                  className="table table-datatable  table-striped table-hover"
                >
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Description</th>
                      <th>SKU</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data ? (
                      data.map(item=> {
                        let totalprice = 0;

for (const key in item.price) {
  if (item.price.hasOwnProperty(key)) {
    const value = parseFloat(item.price[key]);
    
    if (!isNaN(value)) {
      totalprice += value;
    } else {
      
    }
  }
}

totalprice = parseFloat(totalprice.toFixed(2)); // Round to 2 decimal places

console.log("totalprice", totalprice);

                        return (
                        
                        <tr key={item.id}>
                          <td>
                            {item.title} 
                          </td>
                          <td>{item.description}</td>
                          <td>{item.sku}</td>
                          <td>{totalprice}</td>
                          <td>
                            {item.status === "Active" && (
                              <span class="badge badge-success">Active</span>
                            )}
                            {item.status === "Draft" && (
                              <span class="badge badge-secondary">
                                Draft
                              </span>
                            )}
                           
                          </td>
                          <td className="text-center">
                         
                            <Link to={`/product/${item._id}`}>
                              <button className="btn btn-sm btn-light waves-effect waves-light">
                                View
                              </button>
                            </Link>
                            
                          </td>
                        </tr>
                      )})
                    ) : (
                      <tr>
                        <td colspan="6">
                        <Spinner />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                </div>
              </div>
            </div>
          </div>
        </div>
   );
}

export default ProductsListing;