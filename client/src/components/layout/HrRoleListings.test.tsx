import {act, fireEvent, render, screen} from '@testing-library/react';
import {store} from '../../mockStore';
import {Provider} from 'react-redux';
import {mockMatchMedia} from "../../setupTests";
import {BrowserRouter, MemoryRouter} from 'react-router-dom'
import HrRoleListings from './HrRoleListings';
import userEvent from '@testing-library/user-event';

describe('Role List component tests', () => {
    beforeAll(() => {
        mockMatchMedia();
    });
    beforeEach(() => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <HrRoleListings/>
                </BrowserRouter>
            </Provider>)
    });

    it ("able to click All radio button",() => {
        userEvent.click(screen.getByText('All'))
        expect(screen.getByLabelText('All')).toBeChecked()
    });

    it ("able to click Scheduled radio button", () => {
        userEvent.click(screen.getByText('Scheduled'))
        expect(screen.getByLabelText('Scheduled')).toBeChecked()
    });

    it ("able to click Closed radio button", () => {
        userEvent.click(screen.getAllByText('Closed')[0])
        expect(screen.getByLabelText('Closed')).toBeChecked()
    });

    it ("able to click Open radio button", () => {
        userEvent.click(screen.getAllByText('Open')[0])
        expect(screen.getByLabelText('Open')).toBeChecked()
    });

    it ("able to click edit icon and redirect to update page",() => {
        screen.debug(undefined, Infinity);
        const editIconElement = screen.getAllByTestId('edit-icon-click')[0];

        userEvent.click(editIconElement)
        expect(window.location.pathname).toBe('/listingManage/update/1');
    });

    it ("able to click edit icon and redirect to update page",() => {
        screen.debug(undefined, Infinity);
        const listItemElement = screen.getAllByTestId('one-listing')[0];

        userEvent.click(listItemElement)
        expect(window.location.pathname).toBe('/listingManage/1');
    });

})