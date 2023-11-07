import {render, screen, waitFor} from '@testing-library/react';
import {store} from '../../mockStore';
import {Provider} from 'react-redux';
import {mockMatchMedia} from "../../setupTests";
import {MemoryRouter} from "react-router-dom";
import ManageRolePage from './ManageRolePage';

jest.useFakeTimers();

describe('ManageRolePage component tests', () => {
    beforeAll(() => {
        mockMatchMedia();
    });
    beforeEach(() => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/listingManage/1']}>
                    <ManageRolePage/>
                </MemoryRouter>
            </Provider>);
    });

    afterEach(() => {
        store.clearActions();
    });

    it('Should see the Edit button', async () => {
        jest.advanceTimersByTime(3000);
        await waitFor(() => {
            screen.debug(undefined, Infinity) // get all the elements

            const itemElements = screen.getAllByTestId("edit-button");
            expect(itemElements.length).toBe(1);
        });
    })

    it('Should see the View Applicants button', async () => {
        jest.advanceTimersByTime(3000);
        await waitFor(() => {
            const itemElements = screen.getByText("View Applicants");
            expect(itemElements).toBeInTheDocument();
        });
    })

    it('Should see Role Status as Active', async () => {
        jest.advanceTimersByTime(3000);
        await waitFor(() => {
            // Assuming that 'Role status' is a label for the item
            const roleStatusLabel = screen.getByText('Role status');

            // Check if the item with 'Role status' is displayed
            expect(roleStatusLabel).toBeInTheDocument();

            // Check if 'Active' is displayed with the correct color
            const roleStatusItem = roleStatusLabel.nextSibling;
            expect(roleStatusItem).toHaveTextContent('Active');
        });


    })


    it('Should display the Update Records table', async() => {
    // Assuming you have a table with a specific class or data-testid
    jest.advanceTimersByTime(3000);
    await waitFor(() => {
    const roleStatusLabel = screen.getByText('Update Records');
 
    // Check if the item with 'Role status' is displayed
    expect(roleStatusLabel).toBeInTheDocument();
    const updateTable = screen.getByTestId('update-records');
    expect(updateTable).toBeInTheDocument();
 
    // You can also check if the table headers are displayed
    const tableHeaders = screen.getAllByRole('columnheader');
    expect(tableHeaders).toHaveLength(3); // Assuming there are three columns (ID, Name, Date Edited)

    
  });
})


    it('Should see Manager as John Doe', async () => {
        jest.advanceTimersByTime(3000);
        await waitFor(() => {
            const managerElements = screen.getAllByTestId("manager");
            expect(managerElements[0]).toHaveTextContent("John Doe");
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

    it('should show Role Description', async () => {
        jest.advanceTimersByTime(3000);
        await waitFor(() => {
            expect(screen.getByText('Role Description')).toBeInTheDocument();
            // expect(screen.getByText('Manage HR department')).toBeInTheDocument();
            const roleDescElement = screen.getAllByTestId("roleDesc");
            expect(roleDescElement[0]).toHaveTextContent("Manage HR department");
            
            
        });
        });

    it('should show Details', async () => {
        jest.advanceTimersByTime(3000);
        await waitFor(() => {
            expect(screen.getByText('Details')).toBeInTheDocument();
            const detailElement = screen.getAllByTestId("details");
            expect(detailElement[0]).toHaveTextContent("Manages human resources, fostering a positive work environment, handling recruitment, and ensuring compliance with employment laws.");
            

        });
        });

})

