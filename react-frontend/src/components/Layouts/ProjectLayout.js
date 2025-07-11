import AppSideBar from "./appSideBar/AppSideBar.js";

/*

import ProductsPage from "../ProductsPage/ProductsPage";
import QuotationsPage from "../QuotationsPage/QuotationsPage";
import PurchaseOrderPage from "../PurchaseOrderPage/PurchaseOrderPage";
import InvoicesPage from "../InvoicesPage/InvoicesPage";
import CreditNotePage from "../CreditNotePage/CreditNotePage";
import DebitNotePage from "../DebitNotePage/DebitNotePage";
import ServicesPage from "../ServicesPage/ServicesPage";
import ReceiptsPage from "../ReceiptsPage/ReceiptsPage";
import PaymentTermsPage from "../PaymentTermsPage/PaymentTermsPage";
import QuotationItemsPage from "../QuotationItemsPage/QuotationItemsPage";
import PurchaseorderItemsPage from "../PurchaseorderItemsPage/PurchaseorderItemsPage";
~cb-add-import~

~cb-add-services-card~

case "products":
                return <ProductsPage />;
case "quotations":
                return <QuotationsPage />;
case "purchaseOrder":
                return <PurchaseOrderPage />;
case "invoices":
                return <InvoicesPage />;
case "creditNote":
                return <CreditNotePage />;
case "debitNote":
                return <DebitNotePage />;
case "services":
                return <ServicesPage />;
case "receipts":
                return <ReceiptsPage />;
case "paymentTerms":
                return <PaymentTermsPage />;
case "quotationItems":
                return <QuotationItemsPage />;
case "purchaseorderItems":
                return <PurchaseorderItemsPage />;
~cb-add-thurthy~

*/

const AppLayout = (props) => {
  const { children, activeKey, activeDropdown } = props;

  return (
    <div className="flex min-h-[calc(100vh-5rem)] mt-20 bg-white">
      <AppSideBar activeKey={activeKey} activeDropdown={activeDropdown} />
      <div className="flex-1 ml-2">{children}</div>
    </div>
  );
};

export default AppLayout;
