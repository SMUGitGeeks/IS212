import {render, screen, waitFor} from '@testing-library/react';
import Profile from './Profile';
import {store} from '../../mockStore';
import {Provider} from 'react-redux';
import {mockMatchMedia} from "../../setupTests";
import { BrowserRouter } from 'react-router-dom';


describe('Profile component tests', () => {
    beforeAll(() => {
        mockMatchMedia();
        render(<BrowserRouter><Provider store={store}><Profile/></Provider></BrowserRouter>);
    });
    afterEach(() => {  
        store.clearActions();
    });
    it('Shouls see My Profile page', () => {
        const myProfileElement = screen.getByText("My Profile");
        expect(myProfileElement).toBeInTheDocument();
    })
    it('Should see My Skills', () => {
        const mySkillsElement = screen.getByText("My Skills");
        expect(mySkillsElement).toBeInTheDocument();
    })
    it('Should see My Active Skills', () => {
        const myActiveSkillsElement = screen.getByText("Active");
        expect(myActiveSkillsElement).toBeInTheDocument();
    })
    it('Should see My In Progress Skills', () => {
        const myInProgressSkillsElement = screen.getByText("In Progress");
        expect(myInProgressSkillsElement).toBeInTheDocument();
    })
    it('Should see My Unverified Skills', () => {
        const myUnverifiedSkillsElement = screen.getByText("Unverified");
        expect(myUnverifiedSkillsElement).toBeInTheDocument();
    })
})

export {}