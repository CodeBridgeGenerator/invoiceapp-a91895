import React from "react";
import { render, screen } from "@testing-library/react";

import CreditNoteCreateDialogComponent from "../CreditNoteCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders creditNote create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CreditNoteCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("creditNote-create-dialog-component")).toBeInTheDocument();
});
