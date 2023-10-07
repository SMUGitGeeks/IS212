import {render, screen} from '@testing-library/react';
import RolePage from './RolePage';
import {store} from '../../mockStore';
import {Provider} from 'react-redux';
import {mockMatchMedia} from "../../setupTests";

describe('RolePage component tests', () => {
    beforeAll(() => {
        mockMatchMedia();
    });
    it('Should see the Apply Now button', () => {
        render(<Provider store={store}><RolePage/></Provider>);
        const applyNowElement = screen.getByText("Apply Now");
        expect(applyNowElement).toBeInTheDocument();
    })
    it('Should see All Skills', () => {
        render(<Provider store={store}><RolePage/></Provider>);
        const allSkillsElement = screen.getByText("All Skills");
        const communicationSkillElement = screen.getByText("Communication");
        const teamworkSkillElement = screen.getByText("Teamwork");
        expect(allSkillsElement).toBeInTheDocument();
        expect(communicationSkillElement).toBeInTheDocument();
        expect(teamworkSkillElement).toBeInTheDocument();
    })
    it('Should show HR Manager', () => {
        render(<Provider store={store}><RolePage/></Provider>);
        const hrManagerElement = screen.getByText("HR Manager");
        expect(hrManagerElement).toBeInTheDocument();
    })

})

export {}