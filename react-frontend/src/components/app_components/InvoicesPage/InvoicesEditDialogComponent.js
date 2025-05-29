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

const InvoicesCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [customerID, setCustomerID] = useState([])
const [invoiceItems, setInvoiceItems] = useState([])
const [paymentTermsID, setPaymentTermsID] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount companies
                    client
                        .service("companies")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleCompaniesId } })
                        .then((res) => {
                            setCustomerID(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Companies", type: "error", message: error.message || "Failed get companies" });
                        });
                }, []);
 useEffect(() => {
                    //on mount invoiceItems
                    client
                        .service("invoiceItems")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleInvoiceItemsId } })
                        .then((res) => {
                            setInvoiceItems(res.data.map((e) => { return { name: e['service'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "InvoiceItems", type: "error", message: error.message || "Failed get invoiceItems" });
                        });
                }, []);
 useEffect(() => {
                    //on mount paymentTerms
                    client
                        .service("paymentTerms")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singlePaymentTermsId } })
                        .then((res) => {
                            setPaymentTermsID(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "PaymentTerms", type: "error", message: error.message || "Failed get paymentTerms" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            invoiceID: _entity?.invoiceID,
customerID: _entity?.customerID?._id,
invoiceDate: _entity?.invoiceDate,
invoiceItems: _entity?.invoiceItems?._id,
dueDate: _entity?.dueDate,
paymentTermsID: _entity?.paymentTermsID?._id,
remarks: _entity?.remarks,
        };

        setLoading(true);
        try {
            
        await client.service("invoices").patch(_entity._id, _data);
        const eagerResult = await client
            .service("invoices")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "customerID",
                    service : "companies",
                    select:["name"]},{
                    path : "invoiceItems",
                    service : "invoiceItems",
                    select:["service"]},{
                    path : "paymentTermsID",
                    service : "paymentTerms",
                    select:["name"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info invoices updated successfully" });
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

    const customerIDOptions = customerID.map((elem) => ({ name: elem.name, value: elem.value }));
const invoiceItemsOptions = invoiceItems.map((elem) => ({ name: elem.name, value: elem.value }));
const paymentTermsIDOptions = paymentTermsID.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit Invoices" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="invoices-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="invoiceID">Invoice ID:</label>
                <InputText id="invoiceID" className="w-full mb-3 p-inputtext-sm" value={_entity?.invoiceID} onChange={(e) => setValByKey("invoiceID", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["invoiceID"]) && (
              <p className="m-0" key="error-invoiceID">
                {error["invoiceID"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="customerID">Customer ID:</label>
                <Dropdown id="customerID" value={_entity?.customerID?._id} optionLabel="name" optionValue="value" options={customerIDOptions} onChange={(e) => setValByKey("customerID", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["customerID"]) && (
              <p className="m-0" key="error-customerID">
                {error["customerID"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="invoiceDate">Invoice Date:</label>
                undefined
            </span>
            <small className="p-error">
            {!_.isEmpty(error["invoiceDate"]) && (
              <p className="m-0" key="error-invoiceDate">
                {error["invoiceDate"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="invoiceItems">Invoice Items:</label>
                <Dropdown id="invoiceItems" value={_entity?.invoiceItems?._id} optionLabel="name" optionValue="value" options={invoiceItemsOptions} onChange={(e) => setValByKey("invoiceItems", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["invoiceItems"]) && (
              <p className="m-0" key="error-invoiceItems">
                {error["invoiceItems"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="dueDate">Due Date:</label>
                undefined
            </span>
            <small className="p-error">
            {!_.isEmpty(error["dueDate"]) && (
              <p className="m-0" key="error-dueDate">
                {error["dueDate"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="paymentTermsID">Payment Terms ID:</label>
                <Dropdown id="paymentTermsID" value={_entity?.paymentTermsID?._id} optionLabel="name" optionValue="value" options={paymentTermsIDOptions} onChange={(e) => setValByKey("paymentTermsID", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["paymentTermsID"]) && (
              <p className="m-0" key="error-paymentTermsID">
                {error["paymentTermsID"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="remarks">Remarks:</label>
                <InputText id="remarks" className="w-full mb-3 p-inputtext-sm" value={_entity?.remarks} onChange={(e) => setValByKey("remarks", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["remarks"]) && (
              <p className="m-0" key="error-remarks">
                {error["remarks"]}
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

export default connect(mapState, mapDispatch)(InvoicesCreateDialogComponent);
