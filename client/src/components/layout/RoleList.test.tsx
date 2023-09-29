import { render, screen } from '@testing-library/react';
import RoleList from './RoleList';
import { store } from '../../mockStore';
import { Provider } from 'react-redux';
import {mockMatchMedia} from "../../setupTests";
import { BrowserRouter } from 'react-router-dom'

describe('Role List component tests', () => {
    beforeAll(() => {
        mockMatchMedia();
    });
    it('hr manager should be at the top followed by engineering manager', () => {
        render(<Provider store={store}><BrowserRouter><RoleList /></BrowserRouter></Provider>);
        const hrManagerElement = screen.getByText("HR Manager");
        const engineeringManagerElement = screen.getByText("Engineering Manager");
        expect(hrManagerElement).toBeInTheDocument();
        expect(engineeringManagerElement).toBeInTheDocument();
        expect(hrManagerElement.compareDocumentPosition(engineeringManagerElement)).toBe(4);
    });
})