import {render, screen} from '@testing-library/react';
import Roles from './RoleListing';
import {store} from '../../mockStore';
import {Provider} from 'react-redux';
import {mockMatchMedia} from "../../setupTests";
import {BrowserRouter} from "react-router-dom";


describe('Roles component tests', () => {
    beforeAll(() => {
        mockMatchMedia();
    });
    it('Should see Filters', () => {
        render(<BrowserRouter><Provider store={store}><Roles/></Provider></BrowserRouter>);
        const filtersElement = screen.getByText("Filters");
        expect(filtersElement).toBeInTheDocument();
        const sortByElement = screen.getByText("Sort by");
        expect(sortByElement).toBeInTheDocument();
        const pleaseSelectElement = screen.getByText("Please select");
        expect(pleaseSelectElement).toBeInTheDocument();
    })

})

export {}