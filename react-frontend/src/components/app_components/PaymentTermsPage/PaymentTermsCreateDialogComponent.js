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

const PaymentTermsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [invoiceID, setInvoiceID] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [invoiceID], setError);
        }
        set_entity({...init});
        setError({});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
          
            if (_.isEmpty(_entity?.paymentTermID)) {
                error["paymentTermID"] = `Payment Term ID field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.name)) {
                error["name"] = `Name field is required`;
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
            paymentTermID: _entity?.paymentTermID,name: _entity?.name,description: _entity?.description,invoiceID: _entity?.invoiceID?._id,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("paymentTerms").create(_data);
        const eagerResult = await client
            .service("paymentTerms")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "invoiceID",
                    service : "invoices",
                    select:["invoiceID"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Payment Terms updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Payment Terms" });
        }
        setLoading(false);
    };

    

    

    useEffect(() => {
                    // on mount invoices
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
        <Dialog header="Create Payment Terms" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="paymentTerms-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="paymentTermID">Payment Term ID:</label>
                <InputText id="paymentTermID" className="w-full mb-3 p-inputtext-sm" value={_entity?.paymentTermID} onChange={(e) => setValByKey("paymentTermID", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["paymentTermID"]) ? (
              <p className="m-0" key="error-paymentTermID">
                {error["paymentTermID"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="name">Name:</label>
                <InputText id="name" className="w-full mb-3 p-inputtext-sm" value={_entity?.name} onChange={(e) => setValByKey("name", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["name"]) ? (
              <p className="m-0" key="error-name">
                {error["name"]}
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
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="invoiceID">Invoice ID:</label>
                <Dropdown id="invoiceID" value={_entity?.invoiceID?._id} optionLabel="name" optionValue="value" options={invoiceIDOptions} onChange={(e) => setValByKey("invoiceID", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["invoiceID"]) ? (
              <p className="m-0" key="error-invoiceID">
                {error["invoiceID"]}
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

export default connect(mapState, mapDispatch)(PaymentTermsCreateDialogComponent);
