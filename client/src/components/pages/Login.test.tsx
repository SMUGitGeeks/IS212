import {render, screen} from '@testing-library/react';
import Login from './Login';
import {store} from '../../mockStore';
import {Provider} from 'react-redux';
import {mockMatchMedia} from "../../setupTests";


describe('Login component tests', () => {
    beforeAll(() => {
        mockMatchMedia();
    });
    it('should see a button that says login', () => {
        render(<Provider store={store}><Login/></Provider>);
        const buttonElement = screen.getByText("Login");
        expect(buttonElement).toBeInTheDocument();
    })
})

export {}