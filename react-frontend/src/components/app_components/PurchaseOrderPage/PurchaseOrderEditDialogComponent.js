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

const PurchaseOrderCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [customerID, setCustomerID] = useState([])

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

    const onSave = async () => {
        let _data = {
            customerPoId: _entity?.customerPoId,
customerID: _entity?.customerID?._id,
poDate: _entity?.poDate,
remarks: _entity?.remarks,
        };

        setLoading(true);
        try {
            
        await client.service("purchaseOrder").patch(_entity._id, _data);
        const eagerResult = await client
            .service("purchaseOrder")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "customerID",
                    service : "companies",
                    select:["name"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info purchaseOrder updated successfully" });
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

    return (
        <Dialog header="Edit Purchase Order" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="purchaseOrder-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="customerPoId">Customer PO ID:</label>
                <InputText id="customerPoId" className="w-full mb-3 p-inputtext-sm" value={_entity?.customerPoId} onChange={(e) => setValByKey("customerPoId", e.target.value)}  required  />
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
                <label htmlFor="poDate">PO Date:</label>
                undefined
            </span>
            <small className="p-error">
            {!_.isEmpty(error["poDate"]) && (
              <p className="m-0" key="error-poDate">
                {error["poDate"]}
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

export default connect(mapState, mapDispatch)(PurchaseOrderCreateDialogComponent);
