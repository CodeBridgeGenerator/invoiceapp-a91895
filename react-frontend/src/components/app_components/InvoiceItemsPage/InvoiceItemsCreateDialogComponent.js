import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";


const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
      if (Object.hasOwnProperty.call(errorObj.errors, key)) {
        const element = errorObj.errors[key];
        if (element?.message) {
          errMsg[key] = element.message;
        }
      }
    }
    return errMsg.length ? errMsg : errorObj.message ? { error : errorObj.message} : {};
};

const InvoiceItemsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [invoiceId, setInvoiceId] = useState([])
const [service, setService] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [invoiceId,service], setError);
        }
        set_entity({...init});
        setError({});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
          
            if (_.isEmpty(_entity?.quantity)) {
                error["quantity"] = `Quantity field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.description)) {
                error["description"] = `Description field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            invoiceId: _entity?.invoiceId?._id,service: _entity?.service?._id,price: _entity?.price,quantity: _entity?.quantity,description: _entity?.description,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("invoiceItems").create(_data);
        const eagerResult = await client
            .service("invoiceItems")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "invoiceId",
                    service : "invoices",
                    select:["invoiceID"]},{
                    path : "service",
                    service : "services",
                    select:["name"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Invoice Items updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Invoice Items" });
        }
        setLoading(false);
    };

    

    

    useEffect(() => {
                    // on mount invoices
                    client
                        .service("invoices")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleInvoicesId } })
                        .then((res) => {
                            setInvoiceId(res.data.map((e) => { return { name: e['invoiceID'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Invoices", type: "error", message: error.message || "Failed get invoices" });
                        });
                }, []);

useEffect(() => {
                    // on mount services
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

    const invoiceIdOptions = invoiceId.map((elem) => ({ name: elem.name, value: elem.value }));
const serviceOptions = service.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create Invoice Items" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="invoiceItems-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="invoiceId">Invoice ID:</label>
                <Dropdown id="invoiceId" value={_entity?.invoiceId?._id} optionLabel="name" optionValue="value" options={invoiceIdOptions} onChange={(e) => setValByKey("invoiceId", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["invoiceId"]) ? (
              <p className="m-0" key="error-invoiceId">
                {error["invoiceId"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="service">Service:</label>
                <Dropdown id="service" value={_entity?.service?._id} optionLabel="name" optionValue="value" options={serviceOptions} onChange={(e) => setValByKey("service", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["service"]) ? (
              <p className="m-0" key="error-service">
                {error["service"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="price">Price:</label>
                <InputNumber id="price" className="w-full mb-3" mode="currency" currency="MYR" locale="en-US" value={_entity?.price} onValueChange={(e) => setValByKey("price", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["price"]) ? (
              <p className="m-0" key="error-price">
                {error["price"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="quantity">Quantity:</label>
                <InputText id="quantity" className="w-full mb-3 p-inputtext-sm" value={_entity?.quantity} onChange={(e) => setValByKey("quantity", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["quantity"]) ? (
              <p className="m-0" key="error-quantity">
                {error["quantity"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="description">Description:</label>
                <InputText id="description" className="w-full mb-3 p-inputtext-sm" value={_entity?.description} onChange={(e) => setValByKey("description", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["description"]) ? (
              <p className="m-0" key="error-description">
                {error["description"]}
              </p>
            ) : null}
          </small>
            </div>
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

export default connect(mapState, mapDispatch)(InvoiceItemsCreateDialogComponent);
