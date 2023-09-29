import { render, screen } from '@testing-library/react';
import Home from './Home';
import { store } from '../../mockStore';
import { Provider } from 'react-redux';
import {mockMatchMedia} from "../../setupTests";
import { waitFor } from "@testing-library/react";


describe('Home component tests', () => {
    beforeAll(() => {
        mockMatchMedia();
    });
    it('should have an element with class ant-table', () => {
        render(<Provider store={store}><Home /></Provider>);
        // find an element with class ant-table
        waitFor(() => expect(screen).toHaveClass("ant-table"));

    })
})

export {}