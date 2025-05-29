import React from "react";
import { render, screen } from "@testing-library/react";

import DebitNoteCreateDialogComponent from "../DebitNoteCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders debitNote create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <DebitNoteCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("debitNote-create-dialog-component")).toBeInTheDocument();
});
