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
    it('Should see relevant select boxes', () => {
        render(<BrowserRouter><Provider store={store}><Roles/></Provider></BrowserRouter>);
        const sortByElement = screen.getByText("Sort by");
        expect(sortByElement).toBeInTheDocument();
        const pleaseSelectElement = screen.getAllByText("Please select")[0];
        expect(pleaseSelectElement).toBeInTheDocument();
    })

})

export {}