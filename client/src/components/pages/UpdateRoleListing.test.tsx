import {render, screen} from '@testing-library/react';
import UpdateRoleListing from './UpdateRoleListing';
import {store} from '../../mockStore';
import {Provider} from 'react-redux';
import {mockMatchMedia} from "../../setupTests";
import {BrowserRouter} from "react-router-dom";

describe('Update Role Listing component tests', () => {
    beforeAll(() => {
        mockMatchMedia();
    });
    beforeEach(() => {
        render(<BrowserRouter>
        <Provider store={store}><UpdateRoleListing/></Provider>
        </BrowserRouter>);
    });
    it('Should see Update Role Listing page', () => {
        const createRoleListingElement = screen.getByText("Update Role Listing");
        expect(createRoleListingElement).toBeInTheDocument();
    })
    it('Should see Role Name', () => {
        const roleNameElement = screen.getByText("Role name");
        expect(roleNameElement).toBeInTheDocument();
    })  
    it('Should see Role Description', () => {
        const roleDescriptionElement = screen.getByText("Role Description");
        expect(roleDescriptionElement).toBeInTheDocument();
    }) 
    it('Should see Role Listing Description', () => {
        const roleListingDescriptionElement = screen.getByText("Role Listing Description");
        expect(roleListingDescriptionElement).toBeInTheDocument();
    }) 
    it('Should see Role Skills', () => {
        const roleSkillsElement = screen.getByText("Skills");
        expect(roleSkillsElement).toBeInTheDocument();
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
    it('Should see Update button', () => {
        const updateButtonElement = screen.getByText("Save Changes");
        expect(updateButtonElement).toBeInTheDocument();
    })

})

export {}