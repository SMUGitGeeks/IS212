import {render, screen} from '@testing-library/react';
import RolePage from './RolePage';
import {store} from '../../mockStore';
import {Provider} from 'react-redux';
import {mockMatchMedia} from "../../setupTests";
import {MemoryRouter} from "react-router-dom";

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
    it('Should see the Apply Now button', () => {
        const applyNowElement = screen.getByText("Apply Now");
        expect(applyNowElement).toBeInTheDocument();
    })
    it('Should see All Skills', () => {
        const allSkillsElement = screen.getByText("All Skills Required");
        const communicationSkillElement = screen.getAllByText("Communication")[0];
        const teamworkSkillElement = screen.getAllByText("HR management")[0];
        expect(allSkillsElement).toBeInTheDocument();
        expect(communicationSkillElement).toBeInTheDocument();
        expect(teamworkSkillElement).toBeInTheDocument();
    })
    it('Should show HR Manager', () => {
        const hrManagerElement = screen.getByText("HR Manager");
        expect(hrManagerElement).toBeInTheDocument();
    })

})

export {}