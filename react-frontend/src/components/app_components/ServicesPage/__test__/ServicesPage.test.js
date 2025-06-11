import React from "react";
import { render, screen } from "@testing-library/react";

import ServicesPage from "../ServicesPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders services page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ServicesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("services-datatable")).toBeInTheDocument();
    expect(screen.getByRole("services-add-button")).toBeInTheDocument();
});
