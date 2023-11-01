import {render, screen, waitFor} from '@testing-library/react';
import {store} from '../../mockStore';
import {Provider} from 'react-redux';
import {mockMatchMedia} from "../../setupTests";
import {BrowserRouter} from 'react-router-dom'
import HrRoleListings from './HrRoleListings';
import userEvent from '@testing-library/user-event';

describe('Hr Role Listings component tests', () => {
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

    it ("able to click All radio button", () => {
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

    it('should load 3 seconds before displaying data', async () => {
        expect(screen.getByTestId("skeleton-list")).toBeInTheDocument();

        waitFor(() => {
            expect( screen.queryByTestId("skeleton-list")).not.toBeInTheDocument();
            expect( screen.getByText('HR Manager')).toBeInTheDocument();
            expect( screen.getByText('IT Technician')).toBeInTheDocument();
        });
    });
    
    it ("able to click edit icon and redirect to update page", async () => {
        waitFor(() => {
            const editIconElement = screen.getAllByTestId('edit-icon-click')[0];
            expect(editIconElement).toBeInTheDocument();

            userEvent.click(editIconElement)
            expect( window.location.pathname).toBe('/listingManage/update/1');
        });
    });

    it ("able to click edit icon and redirect to listing page", async () => {
    waitFor(() => {
        const listItemElement = screen.getAllByTestId('one-listing')[0];

        userEvent.click(listItemElement)
        expect(window.location.pathname).toBe('/listingManage/1');
    });
    });

    it ("should have 5 role listings in total", async () => {
    waitFor(() => {
        const listItemElement = screen.getAllByTestId('one-listing');

        expect(listItemElement.length).toBe(5);
    });
    });

    it ("should have 0 scheduled role listings in total", async () => {
    waitFor(() => {
        userEvent.click(screen.getByText('Scheduled'))
        const listItemElement = screen.queryAllByTestId('one-listing');

        expect(listItemElement.length).toBe(0);
    });
    });

    it ("should have 3 open role listings", async () => {
    waitFor(() => {
        userEvent.click(screen.getAllByText('Open')[0])
        const listItemElement = screen.getAllByTestId('one-listing');

        expect(listItemElement.length).toBe(3);
    });
    });

    it ("should have 2 closed role listings", async () => {
    waitFor(() => {
        userEvent.click(screen.getAllByText('Closed')[0])
        const listItemElement = screen.getAllByTestId('one-listing');

        expect(listItemElement.length).toBe(2);
        console.log(window.location.pathname)
    });
    });

    it ("should display listing statuses", async () => {
    waitFor(() => {
        const listItemElement = screen.getAllByTestId('status');

        expect(listItemElement.length).toBe(5);
    });
    });

    it ("HR Manager should display open status", async () => {
    waitFor(() => {
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
    });

    it ("HR Manager should display creator as John Doe on 01/08/2023", async () => {
    waitFor(() => {
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
    });

    it ("HR Manager should display updator as John Doe on 13//10/2023", async () => {
    waitFor(() => {
        const updatorElement = screen.getAllByText('Last Updator:')[0];
        const updatorDetailsElement = screen.queryAllByText('John Doe | 13/10/2023')[0];
        const hrManagerElement = screen.getByText("HR Manager");
        const engineeringManagerElement = screen.getAllByText("Engineering Manager")[0];

        expect(updatorDetailsElement).toBeInTheDocument();
        expect(updatorElement).toBeInTheDocument();
        expect(hrManagerElement).toBeInTheDocument();
        expect(engineeringManagerElement).toBeInTheDocument();
        expect(updatorDetailsElement).not.toBe([])
        
        expect(hrManagerElement.compareDocumentPosition(updatorElement)).toBe(4);
        expect(updatorDetailsElement.compareDocumentPosition(updatorElement)).toBe(2);
        expect(updatorDetailsElement.compareDocumentPosition(engineeringManagerElement)).toBe(4);
    });
    });

    it ("Engineer Manager should display closed status", async () => {
    waitFor(() => {
        // screen.debug(undefined, Infinity);
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
    });

    it ("Engineer Manager should display creator as John Doe on 01/08/2023", async () => {
    waitFor(() => {
        const creatorElement = screen.getAllByText('Creator:')[3];
        const creatorDetailsElement = screen.getByText('John Doe | 14/08/2023');
        const itTechnicianElement = screen.getByText("IT Technician");
        const financeStaffElement = screen.getByText("Finance Staff");
        
        expect(creatorElement).toBeInTheDocument();
        expect(creatorDetailsElement).toBeInTheDocument();
        expect(itTechnicianElement).toBeInTheDocument();
        expect(financeStaffElement).toBeInTheDocument();
        
        expect(itTechnicianElement.compareDocumentPosition(creatorElement)).toBe(4);
        expect(creatorElement.compareDocumentPosition(financeStaffElement)).toBe(4);
    });
    });

    it ("Engineer Manager should not display an Updator", async () => {
    waitFor(() => {
        const engineeringManagerListElement = screen.getAllByTestId('one-listing')[3];

        expect(engineeringManagerListElement).toBeInTheDocument();
        expect(engineeringManagerListElement).not.toHaveTextContent('Last Updator:');
    });
    });

    it ("should display location as Thailand for HR Manager", async () => {
    waitFor(() => {
        const locationElement = screen.getAllByText('Thailand')[0];
        const hrManagerElement = screen.getByText("HR Manager");
        const engineeringManagerElement = screen.getAllByText("Engineering Manager")[0];
        
        expect(locationElement).toBeInTheDocument();
        expect(hrManagerElement).toBeInTheDocument();
        expect(engineeringManagerElement).toBeInTheDocument();
        
        expect(hrManagerElement.compareDocumentPosition(locationElement)).toBe(4);
        expect(locationElement.compareDocumentPosition(engineeringManagerElement)).toBe(4);
    });
    });

    it ("should display Human Resources as department for HR Manager", async () => {
    waitFor(() => {
        const departmentElement = screen.getAllByText('Human Resources')[0];
        const hrManagerElement = screen.getByText("HR Manager");
        const engineeringManagerElement = screen.getAllByText("Engineering Manager")[0];
        
        expect(departmentElement).toBeInTheDocument();
        expect(hrManagerElement).toBeInTheDocument();
        expect(engineeringManagerElement).toBeInTheDocument();
        
        expect(hrManagerElement.compareDocumentPosition(departmentElement)).toBe(4);
        expect(departmentElement.compareDocumentPosition(engineeringManagerElement)).toBe(4);
    });
    });
})