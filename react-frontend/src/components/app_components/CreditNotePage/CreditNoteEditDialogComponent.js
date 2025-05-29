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

const CreditNoteCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [invoiceID, setInvoiceID] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount invoices
                    client
                        .service("invoices")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleInvoicesId } })
                        .then((res) => {
                            setInvoiceID(res.data.map((e) => { return { name: e['invoiceID'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Invoices", type: "error", message: error.message || "Failed get invoices" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            creditNoteID: _entity?.creditNoteID,
invoiceID: _entity?.invoiceID?._id,
issueDate: _entity?.issueDate,
reason: _entity?.reason,
        };

        setLoading(true);
        try {
            
        await client.service("creditNote").patch(_entity._id, _data);
        const eagerResult = await client
            .service("creditNote")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "invoiceID",
                    service : "invoices",
                    select:["invoiceID"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info creditNote updated successfully" });
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

    const invoiceIDOptions = invoiceID.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit Credit Note" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="creditNote-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="creditNoteID">Credit Note ID:</label>
                <InputText id="creditNoteID" className="w-full mb-3 p-inputtext-sm" value={_entity?.creditNoteID} onChange={(e) => setValByKey("creditNoteID", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["creditNoteID"]) && (
              <p className="m-0" key="error-creditNoteID">
                {error["creditNoteID"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="invoiceID">Invoice ID:</label>
                <Dropdown id="invoiceID" value={_entity?.invoiceID?._id} optionLabel="name" optionValue="value" options={invoiceIDOptions} onChange={(e) => setValByKey("invoiceID", {_id : e.value})}  />
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
                <label htmlFor="issueDate">Issue Date:</label>
                undefined
            </span>
            <small className="p-error">
            {!_.isEmpty(error["issueDate"]) && (
              <p className="m-0" key="error-issueDate">
                {error["issueDate"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="reason">Reason:</label>
                <InputText id="reason" className="w-full mb-3 p-inputtext-sm" value={_entity?.reason} onChange={(e) => setValByKey("reason", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["reason"]) && (
              <p className="m-0" key="error-reason">
                {error["reason"]}
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

export default connect(mapState, mapDispatch)(CreditNoteCreateDialogComponent);
