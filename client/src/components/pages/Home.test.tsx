import {render, screen, waitFor} from '@testing-library/react';
import Home from './Home';
import {store} from '../../mockStore';
import {Provider} from 'react-redux';
import {mockMatchMedia} from "../../setupTests";
import { BrowserRouter } from 'react-router-dom';


describe('Home component tests', () => {
    beforeAll(() => {
        mockMatchMedia();
    });
    it('should have an element with class ant-table', () => {
        render(<Provider store={store}><BrowserRouter><Home/></BrowserRouter></Provider>);
        // find an element with class ant-table
        const tableElem = screen.queryAllByRole('table');
        expect(tableElem).toHaveLength(1);

    })
})

jest.useFakeTimers();

describe('My Applications Table component tests', () => {
    beforeAll(() => {
        mockMatchMedia();
    });

    beforeEach(() => {
        render(<Provider store={store}><BrowserRouter><Home/></BrowserRouter></Provider>)
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

export {}