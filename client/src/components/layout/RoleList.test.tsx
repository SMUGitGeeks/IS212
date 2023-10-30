import {render, screen, waitFor} from '@testing-library/react';
import RoleList from './RoleList';
import {store} from '../../mockStore';
import {Provider} from 'react-redux';
import {mockMatchMedia} from "../../setupTests";
import {BrowserRouter} from 'react-router-dom'

jest.useFakeTimers();

describe('Role List component tests', () => {
    beforeAll(() => {
        mockMatchMedia();
    });

    beforeEach(() => {
        render(<Provider store={store}><BrowserRouter><RoleList/></BrowserRouter></Provider>)
    });

    it('should load 3 seconds before displaying data', async () => {
        // render(<Provider store={store}><BrowserRouter><RoleList/></BrowserRouter></Provider>)
        // jest.useFakeTimers();

        expect(screen.getByTestId("skeleton-list")).toBeInTheDocument();
        jest.advanceTimersByTime(3000);
        await waitFor(() => {
            expect(screen.queryByTestId("skeleton-list")).not.toBeInTheDocument();
            expect(screen.getByText('HR Manager')).toBeInTheDocument();
            expect(screen.getByText('IT Technician')).toBeInTheDocument();
        });
    });

    it('hr manager should be at the top followed by engineering manager', async () => {
        jest.advanceTimersByTime(3000);

        await waitFor(() => {
            const hrManagerElement = screen.getAllByText("HR Manager")[0];
            const engineeringManagerElement = screen.getAllByText("Engineering Manager")[0];

            expect(hrManagerElement).toBeInTheDocument();
            expect(engineeringManagerElement).toBeInTheDocument();
            expect(hrManagerElement.compareDocumentPosition(engineeringManagerElement)).toBe(4);
        });
    });

    it("should only display 3 open and active listings", () => {
        render(<Provider store={store}><BrowserRouter><RoleList/></BrowserRouter></Provider>);
        const itemElements = screen.getAllByRole("listitem");
        expect(itemElements.length).toBe(3);
    });
})
