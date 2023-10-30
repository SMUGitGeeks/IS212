import {render, screen, waitFor} from '@testing-library/react';
import RolePage from './RolePage';
import {store} from '../../mockStore';
import {Provider} from 'react-redux';
import {mockMatchMedia} from "../../setupTests";
import {MemoryRouter} from "react-router-dom";

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
    it('Should see the Apply Now button', async () => {
        jest.advanceTimersByTime(2000);
        await waitFor(() => {
            const applyNowElement = screen.getByText("Apply Now");
            expect(applyNowElement).toBeInTheDocument();
        });
    })
    it('Should see All Skills', async () => {
        jest.advanceTimersByTime(2000);
        await waitFor(() => {
            const allSkillsElement = screen.getByText("All Skills Required");
            const communicationSkillElement = screen.getByText("Communication");
            const teamworkSkillElement = screen.getByText("HR management");
            expect(allSkillsElement).toBeInTheDocument();
            expect(communicationSkillElement).toBeInTheDocument();
            expect(teamworkSkillElement).toBeInTheDocument();
        });
    })
    it('Should show HR Manager', async () => {
        jest.advanceTimersByTime(2000);
        await waitFor(() => {
            const hrManagerElement = screen.getByText("HR Manager");
            expect(hrManagerElement).toBeInTheDocument();
        });
    })
})