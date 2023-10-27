import {render, screen} from '@testing-library/react';
import RoleList from './RoleList';
import {store} from '../../mockStore';
import {Provider} from 'react-redux';
import {mockMatchMedia} from "../../setupTests";
import {BrowserRouter} from 'react-router-dom'

describe('Role List component tests', () => {
    beforeAll(() => {
        mockMatchMedia();
    });
    it('hr manager should be at the top followed by engineering manager', () => {
        render(<Provider store={store}><BrowserRouter><RoleList/></BrowserRouter></Provider>);
        const hrManagerElement = screen.getByText("HR Manager");
        const engineeringManagerElement = screen.getAllByText("Engineering Manager")[0];
        expect(hrManagerElement).toBeInTheDocument();
        expect(engineeringManagerElement).toBeInTheDocument();
        expect(hrManagerElement.compareDocumentPosition(engineeringManagerElement)).toBe(4);
    });

    it("should only display 3 open and active listings", () => {
        render(<Provider store={store}><BrowserRouter><RoleList/></BrowserRouter></Provider>);
        const itemElements = screen.getAllByRole("listitem");
        expect(itemElements.length).toBe(3);
    });
})