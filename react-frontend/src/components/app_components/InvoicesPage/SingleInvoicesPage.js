import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { TabView, TabPanel } from "primereact/tabview";
import { SplitButton } from "primereact/splitbutton";
import client from "../../../services/restClient";
import CommentsSection from "../../common/CommentsSection";
import ProjectLayout from "../../Layouts/ProjectLayout";

import CreditNotePage from "../CreditNotePage/CreditNotePage";
import DebitNotePage from "../DebitNotePage/DebitNotePage";
import ReceiptsPage from "../ReceiptsPage/ReceiptsPage";
import PaymentTermsPage from "../PaymentTermsPage/PaymentTermsPage";
import QuotationItemsPage from "../QuotationItemsPage/QuotationItemsPage";

const SingleInvoicesPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState({});
  const [isHelpSidebarVisible, setHelpSidebarVisible] = useState(false);

    const [customerID, setCustomerID] = useState([]);
const [paymentTermsID, setPaymentTermsID] = useState([]);
const [customerPoid, setCustomerPoid] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("invoices")
            .get(urlParams.singleInvoicesId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"customerID","paymentTermsID","customerPoid"] }})
            .then((res) => {
                set_entity(res || {});
                const customerID = Array.isArray(res.customerID)
            ? res.customerID.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.customerID
                ? [{ _id: res.customerID._id, name: res.customerID.name }]
                : [];
        setCustomerID(customerID);
const paymentTermsID = Array.isArray(res.paymentTermsID)
            ? res.paymentTermsID.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.paymentTermsID
                ? [{ _id: res.paymentTermsID._id, name: res.paymentTermsID.name }]
                : [];
        setPaymentTermsID(paymentTermsID);
const customerPoid = Array.isArray(res.customerPoid)
            ? res.customerPoid.map((elem) => ({ _id: elem._id, customerPoId: elem.customerPoId }))
            : res.customerPoid
                ? [{ _id: res.customerPoid._id, customerPoId: res.customerPoid.customerPoId }]
                : [];
        setCustomerPoid(customerPoid);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Invoices", type: "error", message: error.message || "Failed get invoices" });
            });
    }, [props,urlParams.singleInvoicesId]);


    const goBack = () => {
        navigate("/invoices");
    };

      const toggleHelpSidebar = () => {
    setHelpSidebarVisible(!isHelpSidebarVisible);
  };

  const copyPageLink = () => {
    const currentUrl = window.location.href;

    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        props.alert({
          title: "Link Copied",
          type: "success",
          message: "Page link copied to clipboard!",
        });
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
        props.alert({
          title: "Error",
          type: "error",
          message: "Failed to copy page link.",
        });
      });
  };

    const menuItems = [
        {
            label: "Copy link",
            icon: "pi pi-copy",
            command: () => copyPageLink(),
        },
        {
            label: "Help",
            icon: "pi pi-question-circle",
            command: () => toggleHelpSidebar(),
        },
    ];

    return (
        <ProjectLayout>
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-12">
                <div className="flex align-items-center justify-content-between">
                <div className="flex align-items-center">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Invoices</h3>
                    <SplitButton
                        model={menuItems.filter(
                        (m) => !(m.icon === "pi pi-trash" && items?.length === 0),
                        )}
                        dropdownIcon="pi pi-ellipsis-h"
                        buttonClassName="hidden"
                        menuButtonClassName="ml-1 p-button-text"
                    />
                </div>
                
                {/* <p>invoices/{urlParams.singleInvoicesId}</p> */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Invoice ID</label><p className="m-0 ml-3" >{_entity?.invoiceID}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Tax</label><p className="m-0 ml-3" >{_entity?.Tax}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Discount</label><p className="m-0 ml-3" >{_entity?.discount}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Total Amount</label><p className="m-0 ml-3" >{_entity?.totalAmount}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Sub Total</label><p className="m-0 ml-3" >{_entity?.subTotal}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Remarks</label><p className="m-0 ml-3" >{_entity?.remarks}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Commercial Statement</label><p className="m-0 ml-3" >{_entity?.commercialStatement}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Bank Account Number</label><p className="m-0 ml-3" >{_entity?.bankAccountNumber}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Bank Name</label><p className="m-0 ml-3" >{_entity?.bankName}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Customer ID</label>
                    {customerID.map((elem) => (
                        <Link key={elem._id} to={`/companies/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.name}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Payment Terms ID</label>
                    {paymentTermsID.map((elem) => (
                        <Link key={elem._id} to={`/paymentTerms/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.name}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Customer PO ID</label>
                    {customerPoid.map((elem) => (
                        <Link key={elem._id} to={`/purchaseOrder/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.customerPoId}</p>
                            </div>
                        </Link>
                    ))}</div>

                    <div className="col-12">&nbsp;</div>
                </div>
            </div>
        </div>
        <div className="mt-2">
            <TabView>
                
                    <TabPanel header="true" leftIcon="pi pi-building-columns mr-2">
                    <CreditNotePage/>
                    </TabPanel>
                    

                    <TabPanel header="true" leftIcon="pi pi-building-columns mr-2">
                    <DebitNotePage/>
                    </TabPanel>
                    

                    <TabPanel header="true" leftIcon="pi pi-building-columns mr-2">
                    <ReceiptsPage/>
                    </TabPanel>
                    

                    <TabPanel header="true" leftIcon="pi pi-building-columns mr-2">
                    <PaymentTermsPage/>
                    </TabPanel>
                    

                    <TabPanel header="true" leftIcon="pi pi-building-columns mr-2">
                    <QuotationItemsPage/>
                    </TabPanel>
                    
            </TabView>
        </div>

      <CommentsSection
        recordId={urlParams.singleInvoicesId}
        user={props.user}
        alert={props.alert}
        serviceName="invoices"
      />
      <div
        id="rightsidebar"
        className={classNames("overlay-auto z-1 surface-overlay shadow-2 absolute right-0 w-20rem animation-duration-150 animation-ease-in-out", { "hidden" : !isHelpSidebarVisible })}
        style={{ top: "60px", height: "calc(100% - 60px)" }}
      >
        <div className="flex flex-column h-full p-4">
          <span className="text-xl font-medium text-900 mb-3">Help bar</span>
          <div className="border-2 border-dashed surface-border border-round surface-section flex-auto"></div>
        </div>
      </div>
      </div>
        </ProjectLayout>
    );
};

const mapState = (state) => {
    const { user, isLoggedIn } = state.auth;
    return { user, isLoggedIn };
};

const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(SingleInvoicesPage);
