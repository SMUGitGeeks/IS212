import {render, screen} from '@testing-library/react';
import CreateRoleListing from './CreateRoleListing';
import {store} from '../../mockStore';
import {Provider} from 'react-redux';
import {mockMatchMedia} from "../../setupTests";
import {BrowserRouter} from "react-router-dom";

describe('CreateRoleListing component tests', () => {
    beforeAll(() => {
        mockMatchMedia();
    });
    beforeEach(() => {
        render(<BrowserRouter>
        <Provider store={store}><CreateRoleListing/></Provider>
        </BrowserRouter>);
    });
    it('Should see Create Role Listing page', () => {
        const createRoleListingElement = screen.getByText("Create New Role Listing");
        expect(createRoleListingElement).toBeInTheDocument();
    })
    it('Should see Role Name', () => {
        const roleNameElement = screen.getByText("Role name");
        expect(roleNameElement).toBeInTheDocument();
    })  
    it('Should see Role Listing Description', () => {
        const roleListingDescriptionElement = screen.getByText("Role Listing Description");
        expect(roleListingDescriptionElement).toBeInTheDocument();
    }) 
    it('Should see Role Skills', () => {
        const roleSkillsElement = screen.getByText("Skills");
        expect(roleSkillsElement).toBeInTheDocument();
    })  

    it('Should see Manager', () => {
        const ManagerElement = screen.getByText("Manager");
        expect(ManagerElement).toBeInTheDocument();
    })
    it('Should see Department', () => {
        const departmentElement = screen.getByText("Department");
        expect(departmentElement).toBeInTheDocument();
    })
    it('Should see Location', () => {
        const locationElement = screen.getByText("Location");
        expect(locationElement).toBeInTheDocument();
    })
    it('Should see Application Period', () => {
        const applicationPeriodElement = screen.getByText("Application Period");
        expect(applicationPeriodElement).toBeInTheDocument();
    })
    it('Should see Create button', () => {
        const createButtonElement = screen.getByText("Save Changes");
        expect(createButtonElement).toBeInTheDocument();
    })

})

export {}