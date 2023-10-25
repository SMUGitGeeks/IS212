import {render, screen} from '@testing-library/react';
import {filterRoleListingsByDepartment, filterRoleListingsByLocation, filterRoleListingsByRoleId} from '../../actions/roleListings';
// import RoleList from './RoleList';
import RoleSearchFilter from './RoleSearchFilter';
import {store} from '../../mockStore';
import {Provider} from 'react-redux';
import {mockMatchMedia} from "../../setupTests";
import {BrowserRouter} from 'react-router-dom';
import userEvent from '@testing-library/user-event';


describe('RoleSearchFilter component tests', () => {
    beforeEach(() => {
        mockMatchMedia();
    });
    
    afterEach(() => {
        store.clearActions();
    });
    it('Should see search by role type', () => {
        render(<BrowserRouter><Provider store={store}><RoleSearchFilter/></Provider></BrowserRouter>);
        const SearchByRoleTypeElement = screen.getByText("Search Role Type");
        expect(SearchByRoleTypeElement).toBeInTheDocument();
    });
    it('Should see search by location', () => {
        render(<BrowserRouter><Provider store={store}><RoleSearchFilter/></Provider></BrowserRouter>);
        const SearchByLocationElement = screen.getByText("Search Location");
        expect(SearchByLocationElement).toBeInTheDocument();
    });
    it('Should see search by department', () => {
        render(<BrowserRouter><Provider store={store}><RoleSearchFilter/></Provider></BrowserRouter>);
        const SearchByDepartmentElement = screen.getByText("Search Department");
        expect(SearchByDepartmentElement).toBeInTheDocument();
    });

    it('Should see clear filter button and is clickable', () => {
        render(<BrowserRouter><Provider store={store}><RoleSearchFilter/></Provider></BrowserRouter>);
        const clearFilterElement = screen.getByText("Clear All Filters");
        expect(clearFilterElement).toBeInTheDocument();
        userEvent.click(clearFilterElement);
        expect(clearFilterElement).toBeEnabled();
    });

    it('FILTER_ROLE_LISTINGS_BY_DEPARTMENT action should be dispatched', () => {
        render(<BrowserRouter><Provider store={store}><RoleSearchFilter/></Provider></BrowserRouter>);
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
        render(<BrowserRouter><Provider store={store}><RoleSearchFilter/></Provider></BrowserRouter>);
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
        render(<BrowserRouter><Provider store={store}><RoleSearchFilter/></Provider></BrowserRouter>);
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


