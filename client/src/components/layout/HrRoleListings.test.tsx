import {render, screen} from '@testing-library/react';
import {store} from '../../mockStore';
import {Provider} from 'react-redux';
import {mockMatchMedia} from "../../setupTests";
import {BrowserRouter} from 'react-router-dom'
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

    it ("able to click edit icon and redirect to listing page",() => {
        const listItemElement = screen.getAllByTestId('one-listing')[0];

        userEvent.click(listItemElement)
        expect(window.location.pathname).toBe('/listingManage/1');
    });

    it ("should have 5 role listings in total",() => {
        const listItemElement = screen.getAllByTestId('one-listing');

        expect(listItemElement.length).toBe(5);
    });

    it ("should have 0 scheduled role listings in total",() => {
        userEvent.click(screen.getByText('Scheduled'))
        const listItemElement = screen.queryAllByTestId('one-listing');

        expect(listItemElement.length).toBe(0);
    });

    it ("should have 3 open role listings",() => {
        userEvent.click(screen.getAllByText('Open')[0])
        const listItemElement = screen.getAllByTestId('one-listing');

        expect(listItemElement.length).toBe(3);
    });

    it ("should have 2 closed role listings",() => {
        userEvent.click(screen.getAllByText('Closed')[0])
        const listItemElement = screen.getAllByTestId('one-listing');

        expect(listItemElement.length).toBe(2);
        console.log(window.location.pathname)
    });

    it ("should display listing statuses",() => {
        const listItemElement = screen.getAllByTestId('status');

        expect(listItemElement.length).toBe(5);
    });

    it ("HR Manager should display open status", () => {
        const statusElement = screen.getAllByTestId('status')[0];
        const hrManagerElement = screen.getByText("HR Manager");
        const engineeringManagerElement = screen.getAllByText("Engineering Manager")[0];

        expect(statusElement).toBeInTheDocument();
        expect(statusElement).toHaveTextContent('Open');
        expect(hrManagerElement).toBeInTheDocument();
        expect(engineeringManagerElement).toBeInTheDocument();
        expect(hrManagerElement.compareDocumentPosition(statusElement)).toBe(4);
        expect(statusElement.compareDocumentPosition(engineeringManagerElement)).toBe(4);
    });

    it ("HR Manager should display creator as John Doe on 01/08/2023", () => {
        const creatorElement = screen.getAllByText('Creator:')[0];
        const creatorDetailsElement = screen.getByText('John Doe | 01/08/2023');
        const updatorElement = screen.getAllByText('Last Updator:')[0];
        const hrManagerElement = screen.getByText("HR Manager");
        const engineeringManagerElement = screen.getAllByText("Engineering Manager")[0];
        
        expect(creatorElement).toBeInTheDocument();
        expect(creatorDetailsElement).toBeInTheDocument();
        expect(updatorElement).toBeInTheDocument();
        expect(hrManagerElement).toBeInTheDocument();
        expect(engineeringManagerElement).toBeInTheDocument();
        
        expect(hrManagerElement.compareDocumentPosition(creatorElement)).toBe(4);
        expect(creatorElement.compareDocumentPosition(updatorElement)).toBe(4);
        expect(creatorElement.compareDocumentPosition(engineeringManagerElement)).toBe(4);
    });

    it ("Engineer Manager should display closed status", () => {
        const statusElement = screen.getAllByTestId('status')[3];
        const itTechnicianElement = screen.getByText("IT Technician");
        const financeStaffElement = screen.getByText("Finance Staff");

        expect(statusElement).toBeInTheDocument();
        expect(statusElement).toHaveTextContent('Closed');
        expect(itTechnicianElement).toBeInTheDocument();
        expect(financeStaffElement).toBeInTheDocument();
        expect(itTechnicianElement.compareDocumentPosition(statusElement)).toBe(4);
        expect(statusElement.compareDocumentPosition(financeStaffElement)).toBe(4);
    });

    it ("Engineer Manager should display creator as John Doe on 01/08/2023", () => {
        const creatorElement = screen.getAllByText('Creator:')[3];
        const creatorDetailsElement = screen.getByText('John Doe | 14/08/2023');
        const updatorElement = screen.getAllByText('Last Updator:')[3];
        const itTechnicianElement = screen.getByText("IT Technician");
        const financeStaffElement = screen.getByText("Finance Staff");
        
        expect(creatorElement).toBeInTheDocument();
        expect(creatorDetailsElement).toBeInTheDocument();
        expect(updatorElement).toBeInTheDocument();
        expect(itTechnicianElement).toBeInTheDocument();
        expect(financeStaffElement).toBeInTheDocument();
        
        expect(itTechnicianElement.compareDocumentPosition(creatorElement)).toBe(4);
        expect(creatorElement.compareDocumentPosition(updatorElement)).toBe(4);
        expect(creatorElement.compareDocumentPosition(financeStaffElement)).toBe(4);
    });

    it ("Engineer Manager should display updator as John Doe on 'date'", () => {
        const creatorElement = screen.getAllByText('Creator:')[3];
        const creatorDetailsElement = screen.getAllByText('John Doe | "date"')[3];
        const updatorElement = screen.getAllByText('Last Updator:')[3];
        const itTechnicianElement = screen.getByText("IT Technician");
        const financeStaffElement = screen.getByText("Finance Staff");

        expect(creatorElement).toBeInTheDocument();
        expect(creatorDetailsElement).toBeInTheDocument();
        expect(updatorElement).toBeInTheDocument();
        expect(itTechnicianElement).toBeInTheDocument();
        expect(financeStaffElement).toBeInTheDocument();
        
        expect(itTechnicianElement.compareDocumentPosition(creatorElement)).toBe(4);
        expect(creatorElement.compareDocumentPosition(updatorElement)).toBe(4);
        expect(creatorElement.compareDocumentPosition(financeStaffElement)).toBe(4);
    });

    it ("should display location as Thailand for HR Manager", () => {
        const locationElement = screen.getAllByText('Thailand')[0];
        const hrManagerElement = screen.getByText("HR Manager");
        const engineeringManagerElement = screen.getAllByText("Engineering Manager")[0];
        
        expect(locationElement).toBeInTheDocument();
        expect(hrManagerElement).toBeInTheDocument();
        expect(engineeringManagerElement).toBeInTheDocument();
        
        expect(hrManagerElement.compareDocumentPosition(locationElement)).toBe(4);
        expect(locationElement.compareDocumentPosition(engineeringManagerElement)).toBe(4);
    });

    it ("should display Human Resources as department for HR Manager", () => {
        const departmentElement = screen.getAllByText('Human Resources')[0];
        const hrManagerElement = screen.getByText("HR Manager");
        const engineeringManagerElement = screen.getAllByText("Engineering Manager")[0];
        
        expect(departmentElement).toBeInTheDocument();
        expect(hrManagerElement).toBeInTheDocument();
        expect(engineeringManagerElement).toBeInTheDocument();
        
        expect(hrManagerElement.compareDocumentPosition(departmentElement)).toBe(4);
        expect(departmentElement.compareDocumentPosition(engineeringManagerElement)).toBe(4);
    });
})