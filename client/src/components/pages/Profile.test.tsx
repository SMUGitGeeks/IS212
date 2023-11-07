import {render, screen, waitFor} from '@testing-library/react';
import Profile from './Profile';
import {store} from '../../mockStore';
import {Provider} from 'react-redux';
import {mockMatchMedia} from "../../setupTests";
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';


describe('Profile component tests', () => {
    beforeAll(() => {
        mockMatchMedia();
        render(
            <Provider store={store}>
            <MemoryRouter initialEntries={['/profile']}>
                <Profile/>
            </MemoryRouter>
            </Provider>);
    });
    afterEach(() => {  
        store.clearActions();
    });
    it('Should render Profile page', () => {
        waitFor(() => {
            const profileElement = screen.getByText("Profile");
            expect(profileElement).toBeInTheDocument();
        })
    })
    it('Should render My Skills', () => {
        waitFor(() => {
            const mySkillsElement = screen.getByText("My Skills");
            expect(mySkillsElement).toBeInTheDocument();
        })
    })
    it('Should click My Active Skills', () => {
        waitFor(() => {

        const myActiveSkillsElement = screen.getByText("Active");
        expect(myActiveSkillsElement).toBeInTheDocument();
        userEvent.click(myActiveSkillsElement);
        expect(myActiveSkillsElement).toBeEnabled();
        })
    })
    it('Should click My In Progress Skills', () => {
        waitFor(() => {

        const myInProgressSkillsElement = screen.getByText("In Progress");
        expect(myInProgressSkillsElement).toBeInTheDocument();
        userEvent.click(myInProgressSkillsElement);
        expect(myInProgressSkillsElement).toBeEnabled();

        })
    })
    it('Should click My Unverified Skills', () => {
        waitFor(() => {

        const myUnverifiedSkillsElement = screen.getByText("Unverified");
        expect(myUnverifiedSkillsElement).toBeInTheDocument();
        userEvent.click(myUnverifiedSkillsElement);
        expect(myUnverifiedSkillsElement).toBeEnabled();

        })
    })
})

export {}