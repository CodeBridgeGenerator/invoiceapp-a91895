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

import InvoicesPage from "../InvoicesPage/InvoicesPage";

const SinglePaymentTermsPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState({});
  const [isHelpSidebarVisible, setHelpSidebarVisible] = useState(false);

    const [invoiceID, setInvoiceID] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("paymentTerms")
            .get(urlParams.singlePaymentTermsId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"invoiceID"] }})
            .then((res) => {
                set_entity(res || {});
                const invoiceID = Array.isArray(res.invoiceID)
            ? res.invoiceID.map((elem) => ({ _id: elem._id, invoiceID: elem.invoiceID }))
            : res.invoiceID
                ? [{ _id: res.invoiceID._id, invoiceID: res.invoiceID.invoiceID }]
                : [];
        setInvoiceID(invoiceID);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "PaymentTerms", type: "error", message: error.message || "Failed get paymentTerms" });
            });
    }, [props,urlParams.singlePaymentTermsId]);


    const goBack = () => {
        navigate("/paymentTerms");
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
                    <h3 className="m-0">Payment Terms</h3>
                    <SplitButton
                        model={menuItems.filter(
                        (m) => !(m.icon === "pi pi-trash" && items?.length === 0),
                        )}
                        dropdownIcon="pi pi-ellipsis-h"
                        buttonClassName="hidden"
                        menuButtonClassName="ml-1 p-button-text"
                    />
                </div>
                
                {/* <p>paymentTerms/{urlParams.singlePaymentTermsId}</p> */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Payment Term ID</label><p className="m-0 ml-3" >{_entity?.paymentTermID}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Name</label><p className="m-0 ml-3" >{_entity?.name}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Description</label><p className="m-0 ml-3" >{_entity?.description}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Invoice ID</label>
                    {invoiceID.map((elem) => (
                        <Link key={elem._id} to={`/invoices/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.invoiceID}</p>
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
                    <InvoicesPage/>
                    </TabPanel>
                    
            </TabView>
        </div>

      <CommentsSection
        recordId={urlParams.singlePaymentTermsId}
        user={props.user}
        alert={props.alert}
        serviceName="paymentTerms"
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

export default connect(mapState, mapDispatch)(SinglePaymentTermsPage);
