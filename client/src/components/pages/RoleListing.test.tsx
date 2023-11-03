import {render, screen, waitFor} from '@testing-library/react';
import {filterRoleListingsByDepartment, filterRoleListingsByLocation, filterRoleListingsByRoleId} from '../../actions/roleListings';
// import RoleList from './RoleList';
import {store} from '../../mockStore';
import {Provider} from 'react-redux';
import {mockMatchMedia} from "../../setupTests";
import {BrowserRouter} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import RoleListing from './RoleListing';


describe('RoleSearchFilter component tests', () => {
    beforeEach(() => {
        mockMatchMedia();
        render(<BrowserRouter><Provider store={store}><RoleListing/></Provider></BrowserRouter>);
    });
    
    afterEach(() => {
        store.clearActions();
    });
    it('Should see search by role type', () => {
        const SearchByRoleTypeElement = screen.getByText("Search Role Type");
        expect(SearchByRoleTypeElement).toBeInTheDocument();
    });
    it('Should see search by location', () => {
        const SearchByLocationElement = screen.getByText("Search Location");
        expect(SearchByLocationElement).toBeInTheDocument();
    });
    it('Should see search by department', () => {
        const SearchByDepartmentElement = screen.getByText("Search Department");
        expect(SearchByDepartmentElement).toBeInTheDocument();
    });

    it('Should see clear filter button and is clickable', () => {
        const clearFilterElement = screen.getByText("Clear All Filters");
        expect(clearFilterElement).toBeInTheDocument();
        userEvent.click(clearFilterElement);
        expect(clearFilterElement).toBeEnabled();
    });

    it('FILTER_ROLE_LISTINGS_BY_DEPARTMENT action should be dispatched', () => {
        const payload = { departments: ["IT"] };
        const expectedAction = {
        type: 'FILTER_ROLE_LISTINGS_BY_DEPARTMENT',
        payload,
        };

        store.dispatch(filterRoleListingsByDepartment(payload) as any);

        const actions = store.getActions();
        // console.log(actions);
        expect(actions).toEqual([expectedAction]);
    });

    it('FILTER_ROLE_LISTINGS_BY_LOCATION action should be dispatched', () => {
        const payload = { locations: ["Singapore", "Thailand"] };
        const expectedAction = {
        type: 'FILTER_ROLE_LISTINGS_BY_LOCATION',
        payload,
        };

        store.dispatch(filterRoleListingsByLocation(payload) as any);

        const actions = store.getActions();
        expect(actions).toEqual([expectedAction]);
    });

    it('FILTER_ROLE_LISTINGS_BY_ROLE_ID action should be dispatched', () => {
        const payload = { roleIds: [1, 2, 3] };
        const expectedAction = {
        type: 'FILTER_ROLE_LISTINGS_BY_ROLE_ID',
        payload,
        };

        store.dispatch(filterRoleListingsByRoleId(payload) as any);

        const actions = store.getActions();
        expect(actions).toEqual([expectedAction]);
    });
});

jest.useFakeTimers();

describe('Role List component tests', () => {
    beforeAll(() => {
        mockMatchMedia();
    });

    beforeEach(() => {
        render(<Provider store={store}><BrowserRouter><RoleListing/></BrowserRouter></Provider>)
    });

    it('should load 3 seconds before displaying data', async () => {
        expect(screen.getByTestId("skeleton-list")).toBeInTheDocument();
        jest.advanceTimersByTime(3000);
        await waitFor(() => {
            expect(screen.queryByTestId("skeleton-list")).not.toBeInTheDocument();
            expect(screen.getByText('HR Manager')).toBeInTheDocument();
            expect(screen.getByText('IT Technician')).toBeInTheDocument();
        });
    });

    it('hr manager should be at the top followed by engineering manager', async () => {
        jest.advanceTimersByTime(3000);

        await waitFor(() => {
            const hrManagerElement = screen.getAllByText("HR Manager")[0];
            const engineeringManagerElement = screen.getAllByText("Engineering Manager")[0];

            expect(hrManagerElement).toBeInTheDocument();
            expect(engineeringManagerElement).toBeInTheDocument();
            expect(hrManagerElement.compareDocumentPosition(engineeringManagerElement)).toBe(4);
        });
    });

    it("should only display 3 open and active listings", async () => {
        jest.advanceTimersByTime(3000);

        await waitFor(() => {
            const itemElements = screen.getAllByTestId("role-listing");
            expect(itemElements.length).toBe(3);
        });
    });
})