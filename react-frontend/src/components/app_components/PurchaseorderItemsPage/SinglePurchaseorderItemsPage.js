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

import { InputNumber } from 'primereact/inputnumber';

const SinglePurchaseorderItemsPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState({});
  const [isHelpSidebarVisible, setHelpSidebarVisible] = useState(false);

    const [customerPoId, setCustomerPoId] = useState([]);
const [service, setService] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("purchaseorderItems")
            .get(urlParams.singlePurchaseorderItemsId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"customerPoId","service"] }})
            .then((res) => {
                set_entity(res || {});
                const customerPoId = Array.isArray(res.customerPoId)
            ? res.customerPoId.map((elem) => ({ _id: elem._id, customerPoId: elem.customerPoId }))
            : res.customerPoId
                ? [{ _id: res.customerPoId._id, customerPoId: res.customerPoId.customerPoId }]
                : [];
        setCustomerPoId(customerPoId);
const service = Array.isArray(res.service)
            ? res.service.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.service
                ? [{ _id: res.service._id, name: res.service.name }]
                : [];
        setService(service);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "PurchaseorderItems", type: "error", message: error.message || "Failed get purchaseorderItems" });
            });
    }, [props,urlParams.singlePurchaseorderItemsId]);


    const goBack = () => {
        navigate("/purchaseorderItems");
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
                    <h3 className="m-0">Purchase Order Items</h3>
                    <SplitButton
                        model={menuItems.filter(
                        (m) => !(m.icon === "pi pi-trash" && items?.length === 0),
                        )}
                        dropdownIcon="pi pi-ellipsis-h"
                        buttonClassName="hidden"
                        menuButtonClassName="ml-1 p-button-text"
                    />
                </div>
                
                {/* <p>purchaseorderItems/{urlParams.singlePurchaseorderItemsId}</p> */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Price</label><p className="m-0 ml-3" ><InputNumber id="price" value={Number(_entity?.price)} mode="currency" currency="MYR" locale="en-US"   disabled={true} /></p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Quantity</label><p className="m-0 ml-3" >{_entity?.quantity}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Description</label><p className="m-0 ml-3" >{_entity?.description}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Customer PO ID</label>
                    {customerPoId.map((elem) => (
                        <Link key={elem._id} to={`/purchaseOrder/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.customerPoId}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Service</label>
                    {service.map((elem) => (
                        <Link key={elem._id} to={`/services/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.name}</p>
                            </div>
                        </Link>
                    ))}</div>

                    <div className="col-12">&nbsp;</div>
                </div>
            </div>
        </div>
        <div className="mt-2">
            <TabView>
                
            </TabView>
        </div>

      <CommentsSection
        recordId={urlParams.singlePurchaseorderItemsId}
        user={props.user}
        alert={props.alert}
        serviceName="purchaseorderItems"
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

export default connect(mapState, mapDispatch)(SinglePurchaseorderItemsPage);
