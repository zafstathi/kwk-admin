import React, { useRef } from "react";
import useReq from "../hooks/useReq";
import Spinner from "./Spinner";
function OderItems({ order, item }) {
  const quantityRef = useRef();
  const { sendRequest } = useReq();
  const deleteItem = (id) => {
    console.log("delete item", id);
  };

  const editItem = (id) => {
    console.log("edit item", id);
    const quantity = quantityRef.current.value;
    const data = {
      quantity: quantity,
      total: quantity * item.price,
    };
    sendRequest(`orders/${order.id}`, "PATCH", data, onResponse);
  };

  const onResponse = (err, res) => {
    if (err) {
      console.log(err);
      return;
    }
    alert("Edit success");
  };
  return (
    <tr id="1">
      <td>{item.name}</td>
      <td>{item.seller}</td>
      <td className="d-flex justify-content-center">
        <input
          ref={quantityRef}
          type="number"
          defaultValue={item.quantity}
          className="form-control w-50"
        />
      </td>
      <td>$ {item.price}</td>
      <td>$ {item.total}</td>
      <td className="text-center">
        <button
          className="btn  btn-sm btn-outline-primary mx-2"
          onClick={() => editItem(item.id)}
        >
          Save
        </button>
        <button
          className="del-elm btn btn-sm btn-outline-danger mx-2"
          onClick={() => deleteItem(item.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default OderItems;
