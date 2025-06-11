import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';


const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const PurchaseorderItemsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [customerPoId, setCustomerPoId] = useState([])
const [service, setService] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount purchaseOrder
                    client
                        .service("purchaseOrder")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singlePurchaseOrderId } })
                        .then((res) => {
                            setCustomerPoId(res.data.map((e) => { return { name: e['customerPoId'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "PurchaseOrder", type: "error", message: error.message || "Failed get purchaseOrder" });
                        });
                }, []);
 useEffect(() => {
                    //on mount services
                    client
                        .service("services")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleServicesId } })
                        .then((res) => {
                            setService(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Services", type: "error", message: error.message || "Failed get services" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            customerPoId: _entity?.customerPoId?._id,
service: _entity?.service?._id,
price: _entity?.price,
quantity: _entity?.quantity,
description: _entity?.description,
        };

        setLoading(true);
        try {
            
        await client.service("purchaseorderItems").patch(_entity._id, _data);
        const eagerResult = await client
            .service("purchaseorderItems")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "customerPoId",
                    service : "purchaseOrder",
                    select:["customerPoId"]},{
                    path : "service",
                    service : "services",
                    select:["name"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info purchaseorderItems updated successfully" });
        props.onEditResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to update info");
            props.alert({ type: "error", title: "Edit info", message: "Failed to update info" });
        }
        setLoading(false);
    };

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    const customerPoIdOptions = customerPoId.map((elem) => ({ name: elem.name, value: elem.value }));
const serviceOptions = service.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit Purchase Order Items" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="purchaseorderItems-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="customerPoId">Customer PO ID:</label>
                <Dropdown id="customerPoId" value={_entity?.customerPoId?._id} optionLabel="name" optionValue="value" options={customerPoIdOptions} onChange={(e) => setValByKey("customerPoId", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["customerPoId"]) && (
              <p className="m-0" key="error-customerPoId">
                {error["customerPoId"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="service">Service:</label>
                <Dropdown id="service" value={_entity?.service?._id} optionLabel="name" optionValue="value" options={serviceOptions} onChange={(e) => setValByKey("service", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["service"]) && (
              <p className="m-0" key="error-service">
                {error["service"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="price">Price:</label>
                <InputNumber id="price" className="w-full mb-3" mode="currency" currency="MYR" locale="en-US" value={_entity?.price} onValueChange={(e) => setValByKey("price", e.value)} useGrouping={false}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["price"]) && (
              <p className="m-0" key="error-price">
                {error["price"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="quantity">Quantity:</label>
                <InputText id="quantity" className="w-full mb-3 p-inputtext-sm" value={_entity?.quantity} onChange={(e) => setValByKey("quantity", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["quantity"]) && (
              <p className="m-0" key="error-quantity">
                {error["quantity"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="description">Description:</label>
                <InputText id="description" className="w-full mb-3 p-inputtext-sm" value={_entity?.description} onChange={(e) => setValByKey("description", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["description"]) && (
              <p className="m-0" key="error-description">
                {error["description"]}
              </p>
            )}
          </small>
            </div>
                <div className="col-12">&nbsp;</div>
                <small className="p-error">
                {Array.isArray(Object.keys(error))
                ? Object.keys(error).map((e, i) => (
                    <p className="m-0" key={i}>
                        {e}: {error[e]}
                    </p>
                    ))
                : error}
            </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(PurchaseorderItemsCreateDialogComponent);
