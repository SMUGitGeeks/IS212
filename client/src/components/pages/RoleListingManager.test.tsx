import {render, screen} from '@testing-library/react';
import {store} from '../../mockStore';
import {Provider} from 'react-redux';
import {mockMatchMedia} from "../../setupTests";
import {BrowserRouter} from 'react-router-dom'
import RoleListingManager from './RoleListingManager';

describe('Role List Manager component tests', () => {
    beforeAll(() => {
        mockMatchMedia();
    });

    it ("should see search roles filter",() => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <RoleListingManager/>
                </BrowserRouter>
            </Provider>)
        
        const selectElement = screen.getByText('Search Roles');
        expect(selectElement).toBeInTheDocument();
    });

})