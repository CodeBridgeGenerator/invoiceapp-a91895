import React from "react";
import { render, screen } from "@testing-library/react";

import PaymentTermsPage from "../PaymentTermsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders paymentTerms page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PaymentTermsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("paymentTerms-datatable")).toBeInTheDocument();
    expect(screen.getByRole("paymentTerms-add-button")).toBeInTheDocument();
});
