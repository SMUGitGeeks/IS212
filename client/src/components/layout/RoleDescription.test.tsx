import {render, screen, waitFor} from '@testing-library/react';
import {store} from '../../mockStore';
import {Provider} from 'react-redux';
import {mockMatchMedia} from "../../setupTests";
import {BrowserRouter, MemoryRouter} from 'react-router-dom'
import RoleDescription from './RoleDescription';


jest.useFakeTimers();

describe('Role Description component tests', () => {
    beforeAll(() => {
        mockMatchMedia();
    });

    beforeEach(() => {
        render(<Provider store={store}><BrowserRouter><RoleDescription/></BrowserRouter></Provider>)
    });

    it('should initially display a loading state', () => {
        const skeletonElements = screen.getByTestId('loading-icon');
        expect(skeletonElements).toBeInTheDocument();
    });

    it('should load data after 2 seconds', async () => {
    jest.advanceTimersByTime(2000);
    await waitFor(() => {
        // Ensure that the data is displayed after 2 seconds
        expect(screen.getByText('Role Description')).toBeInTheDocument();
    });
    });

    it('should remove loading state after loading data', async () => {
    jest.advanceTimersByTime(2000);
    await waitFor(() => {
        // Ensure that the loading state is removed after data is loaded
        const skeletonElements = screen.queryByTestId('loading-icon');
        expect(skeletonElements).toBeNull();
    });
    });

});