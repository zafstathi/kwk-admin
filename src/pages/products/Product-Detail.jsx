import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Spinner from "../../components/Spinner";
import useReq from "../../hooks/useReq";

function ProductDetail() {
    const location = useLocation();
    const { sendRequest } = useReq();
    const [product, setProduct] = useState(null);
    
    useEffect(() => {
    const productId = location.pathname.split("/")[2];
    sendRequest(`admin/product/${productId}`, "GET", null, onResponse);
    }, [location]);
    
    const onResponse = (err, res) => {
        if (err) {
            console.log(err);
            return;
        }
        if (res.data.data) {
			console.log(res.data.data);
            setProduct(res.data.data)
        }
    }
	const calculateTotalPrice = (priceObject) => {
		const values = Object.values(priceObject);
		let totalPrice = 0;
	  
		values.forEach((value) => {
		  const numericValue = parseFloat(value);
		  if (!isNaN(numericValue)) {
			totalPrice += numericValue;
		  } else {
			console.log(`Non-numeric value found: ${value}`);
		  }
		});
	  
		return totalPrice.toFixed(2);
	  };
	  
	  
	  
	  
	  
	  
	  
	  
    return (
    <div class="row mb-5">
						<div class="col-md-12">
							<div class="card">
                    <div class="card-body product-page">
                        {product ? (
									<div class="row">
										<div class="col-md-6">
											<div id="carouselExampleIndicators" class="carousel slide mb-5" data-ride="carousel" data-interval="false">
												<ol class="carousel-indicators">
													<li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
													<li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
													<li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
												</ol>
												<div class="carousel-inner" role="listbox">
													<div class="carousel-item active">
														<img class="d-block img-fluid" src="assets/img/propane-tank.jpg" alt="Product Image 1" />
													</div>
												</div>
												{/* <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev" />
													<i class="batch-icon batch-icon-arrow-left batch-icon-lg"></i>
													<span class="sr-only">Previous</span>
												</a> */}
												{/* <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
													<i class="batch-icon batch-icon-arrow-right batch-icon-lg"></i>
													<span class="sr-only">Next</span>
												</a> */}
											</div>
										</div>
										<div class="col-md-6">
                                    <h1>{product.title} </h1>
                                    {product.status === 'Active' && <span class="badge badge-success">Active</span>}
                                    {product.status === 'Draft' && <span class="badge badge-secondary">Draft</span>}
											<div class="price-block mb-2">
											
                                                <div class="price-new">${calculateTotalPrice(product.price)}</div>
												{/* <div class="price-old">$749</div> */}
												<div class="price-discount">{product.organization}</div>
											</div>
											<div class="ratings">
												<i class="batch-icon batch-icon-star-alt rating-highlighted"></i>
												<i class="batch-icon batch-icon-star-alt rating-highlighted"></i>
												<i class="batch-icon batch-icon-star-alt rating-highlighted"></i>
												<i class="batch-icon batch-icon-star-alt rating-highlighted"></i>
												<i class="batch-icon batch-icon-star-alt"></i>
                                    </div>
                                    <div class="row">
												
												<div class="col-sm-4">
													<div class="form-group">
														<label for="quantity"><b>Weight</b></label>  {product.dimensions.weight}{product.dimensions.unit}
													
													</div>
                                        </div>
                                                <div class="col-sm-4">
													<div class="form-group">
														<label for="quantity"><b>Stock</b></label>  {product.stock}
													
													</div>
                                                 </div>
                                               
											</div>
											<h3>Description</h3>
											<p class="lead">
												{product.description}
											</p>
											
											
								
										</div>
									</div>
								): <Spinner />}
								</div>
							</div>
						</div>
					</div>
    )
}

export default ProductDetail;