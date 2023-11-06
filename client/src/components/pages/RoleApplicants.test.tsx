import {render, screen, waitFor} from '@testing-library/react';
import {store} from '../../mockStore';
import {Provider} from 'react-redux';
import {mockMatchMedia} from "../../setupTests";
import {BrowserRouter} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import RoleApplicants from './RoleApplicants';

jest.useFakeTimers();

describe('Role Applicants page tests', () => {
    beforeAll(() => {
        mockMatchMedia();
    });

    beforeEach(() => {
        render(<Provider store={store}><BrowserRouter><RoleApplicants/></BrowserRouter></Provider>)
    });

    it('should load 3 seconds before displaying data', async () => {
        expect(screen.getAllByTestId("skeleton-list")[0]).toBeInTheDocument();
        jest.advanceTimersByTime(3000);

        await waitFor(() => {
            expect(screen.queryAllByTestId("skeleton-list")).toHaveLength(0);
            expect(screen.getByText('Jane Smith')).toBeInTheDocument();
            expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
        });
    });

    it("should only display 4 staff items", async () => {
        jest.advanceTimersByTime(3000);

        await waitFor(() => {
            const itemElements = screen.getAllByTestId("staff-listing");
            expect(itemElements.length).toBe(4);
        });
    });

    it ("should immediately sort applicants by skill match", async () => {
        jest.advanceTimersByTime(3000);

        await waitFor(() => {
            expect(screen.getAllByText("Skill Match")[1]).toBeInTheDocument();
            const skillMatchElements = screen.getAllByTestId("skill-match");
            expect(skillMatchElements[0].innerHTML >= skillMatchElements[1].innerHTML).toBe(true);
            expect(skillMatchElements[1].innerHTML >= skillMatchElements[2].innerHTML).toBe(true);
            expect(skillMatchElements[2].innerHTML >= skillMatchElements[3].innerHTML).toBe(true);
        });
    });
})