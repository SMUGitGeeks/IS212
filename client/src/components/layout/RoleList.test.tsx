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
            const hrManagerElement = screen.getByText("HR Manager");
            const engineeringManagerElement = screen.getByText("Engineering Manager");

            expect(hrManagerElement).toBeInTheDocument();
            expect(engineeringManagerElement).toBeInTheDocument();
            expect(hrManagerElement.compareDocumentPosition(engineeringManagerElement)).toBe(4);
        });
    });

});