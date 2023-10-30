import {render, screen, waitFor} from '@testing-library/react';
import {store} from '../../mockStore';
import {Provider} from 'react-redux';
import {mockMatchMedia} from "../../setupTests";
import {BrowserRouter} from 'react-router-dom'
import MyApplications from './MyApplications';


jest.useFakeTimers();

describe('My Applications component tests', () => {
    beforeAll(() => {
        mockMatchMedia();
    });

    beforeEach(() => {
        render(<Provider store={store}><BrowserRouter><MyApplications/></BrowserRouter></Provider>)
    });

    it('should initially display a loading state', () => {
        const listElem = screen.queryAllByRole('list');
        expect(listElem).toHaveLength(6);
    });

    it('should load data after 3 seconds', async () => {
        jest.advanceTimersByTime(3000);
        await waitFor(() => {
            expect(screen.getByText("No data")).toBeInTheDocument();
        });
    });

    it('should remove loading state after loading data', async () => {
        jest.advanceTimersByTime(3000);
        await waitFor(() => {
            const listElements = screen.queryAllByRole('list');
            expect(listElements.length).toBe(0); 
        });
    });

});