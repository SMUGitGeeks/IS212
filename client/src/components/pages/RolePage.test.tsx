import {render, screen, waitFor} from '@testing-library/react';
import RolePage from './RolePage';
import {store} from '../../mockStore';
import {Provider} from 'react-redux';
import {mockMatchMedia} from "../../setupTests";
import {BrowserRouter, MemoryRouter} from "react-router-dom";

jest.useFakeTimers();

describe('RolePage component tests', () => {
    beforeAll(() => {
        mockMatchMedia();
    });
    beforeEach(() => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/roleListing/1']}>
                    <RolePage/>
                </MemoryRouter>
            </Provider>);
    });

    afterEach(() => {
        store.clearActions();
    });

    it('Should see the Apply Now button', async () => {
        jest.advanceTimersByTime(3000);
        await waitFor(() => {
            screen.debug(undefined, Infinity)
            const applyNowElement = screen.getByText("Apply Now");
            expect(applyNowElement).toBeInTheDocument();
        });
    })
    it('Should see All Skills', async () => {
        jest.advanceTimersByTime(3000);
        await waitFor(() => {
            const allSkillsElement = screen.getByText("All Skills Required");
            const communicationSkillElement = screen.getAllByText("Communication")[0];
            const teamworkSkillElement = screen.getAllByText("HR management")[0];
            expect(allSkillsElement).toBeInTheDocument();
            expect(communicationSkillElement).toBeInTheDocument();
            expect(teamworkSkillElement).toBeInTheDocument();
        });
    })
    it('Should show HR Manager', async () => {
        jest.advanceTimersByTime(3000);
        await waitFor(() => {
            const hrManagerElement = screen.getByText("HR Manager");
            expect(hrManagerElement).toBeInTheDocument();
        });
    })
})

describe('Loading tests', () => {
    beforeAll(() => {
        mockMatchMedia();
    });

    beforeEach(() => {
        render(<Provider store={store}><BrowserRouter><RolePage/></BrowserRouter></Provider>)
    });

    it('should initially display a loading state', () => {
        const skeletonElements = screen.getByTestId('loading-icon');
        expect(skeletonElements).toBeInTheDocument();
    });

    it('should load data after 2 seconds', async () => {
    jest.advanceTimersByTime(3000);
    await waitFor(() => {
        // Ensure that the data is displayed after 2 seconds
        expect(screen.getByText('Role Description')).toBeInTheDocument();
    });
    });

    it('should remove loading state after loading data', async () => {
    jest.advanceTimersByTime(3000);
    await waitFor(() => {
        // Ensure that the loading state is removed after data is loaded
        const skeletonElements = screen.queryByTestId('loading-icon');
        expect(skeletonElements).toBeNull();
    });
    });

});