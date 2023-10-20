import {render, screen} from '@testing-library/react';
import RoleSearchFilter from './RoleSearchFilter';
import {store} from '../../mockStore';
import {Provider} from 'react-redux';
import {mockMatchMedia} from "../../setupTests";
import {BrowserRouter} from "react-router-dom";


describe('RoleSearchFilter component tests', () => {
    beforeAll(() => {
        mockMatchMedia();
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

});
