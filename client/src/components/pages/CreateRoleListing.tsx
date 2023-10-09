import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postRoleListing } from '../../actions/roleListings';
export type ActionType = string;
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { getSkills } from '../../actions/skills';

const CreateRoleListing = () => {
    const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
    
    
    const [formData, setFormData] = useState({
        role_id: '',
        rl_creator: '',
        rl_description: '',
        rl_skills: '',
        rl_open: '',
        rl_close: '',
        rl_status: ''
    });

    const { role_id, rl_creator, rl_description, rl_skills, rl_open, rl_close, rl_status } = formData;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => 
        setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await dispatch(postRoleListing(formData));
    };

    return (
        <div>
            <h1>Create New Role Listing</h1>
            <form onSubmit={e => onSubmit(e)}>
                <div>
                    <label>Role ID</label>
                    <input type='text' name='role_id' value={role_id} onChange={e => onChange(e)} required/>
                </div>
                <div>
                    <label>Role Listing Creator</label>
                    <input type='text' name='rl_creator' value={rl_creator} onChange={e => onChange(e)} required/>
                </div>
                <div>
                    <label>Role Listing Description</label>
                    <input type='text' name='rl_description' value={rl_description} onChange={e => onChange(e)} required/>
                </div>
                <div>
                    <label htmlFor="skill-select">Select a skill:</label>
                    <select id="skill-select">
                        {skills.skills.map((skill: { id: number, name: string }) => (
                        <option key={skill.id} value={skill.id}>
                            {skill.name}
                        </option>
                        ))}
                    </select> 
                </div>
                <div>
                    <label>Role Listing Open Date</label>
                    <input type='text' name='rl_open' value={rl_open} onChange={e => onChange(e)} required/>
                </div>
                <div>
                    <label>Role Listing Close Date</label>
                    <input type='text' name='rl_close' value={rl_close} onChange={e => onChange(e)} required/>
                </div>
                <div>
                    <label>Role Listing Status</label>
                    <input type='text' name='rl_status' value={rl_status} onChange={e => onChange(e)} required/>
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default CreateRoleListing;