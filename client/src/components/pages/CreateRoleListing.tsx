import axios from 'axios'
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { postRoleListing } from '../../actions/roleListings';
import { getSkills } from '../../actions/skills';
import { Container } from 'react-bootstrap';
export type ActionType = string;
// import { ThunkDispatch } from 'redux-thunk';
// import { AnyAction } from 'redux';

const CreateRoleListing = ({
                            getSkills,
                            postRoleListing,
                            // auth: {user}
                        }: any) => {
    useEffect(() => {
        // if (user) {
        //     getSkills();
        //     postRoleListing(user);
        // }
    }, [getSkills, postRoleListing]);

    const [formData, setFormData] = useState({
        role_id: '',
        rl_creator: '',
        rl_description: '',
        rl_skills: '',
        rl_open: '',
        rl_close: '',
        rl_status: ''
    });

    const [selectedSkills, setSelectedSkills] = useState("all");

    console.log(getSkills)
    // const { role_id, rl_creator, rl_description, rl_skills, rl_open, rl_close, rl_status } = formData;

    const onChange = (value: string, name: string) => {
        console.log(value, name);
    }
        // setFormData({...formData, [e.target.name]: e.target.value});

        const onSkillChange = (e: any) => {
            const options = e.target.options;
            const selectedValues = [];
            for (let i = 0; i < options.length; i++) {
              if (options[i].selected) {
                selectedValues.push(options[i].value);
              }
            }
            // setSelectedSkills(selectedValues);
          };
    
    const onSubmit = (e: any) => {
        e.preventDefault();
        // formData.rl_skills = selectedSkills.join(', ');
        axios.post('/api/role_listing', formData)
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
            console.error(err);
        });
    };

    return (
        <Container>
        <div>
            <h1>Create New Role Listing</h1>
            <form onSubmit={e => onSubmit(e)}>
                <div>
                    <label>Role ID</label>
                    <input type='number' name='role_id' required/>
                </div>
                <div>
                    <label>Role Listing Creator</label>
                    <input type='text' name='rl_creator' required/>
                </div>
                <div>
                    <label>Role Listing Description</label>
                    <input type='text' name='rl_description' required/>
                </div>
                <div>
                    <label htmlFor="skill-select">Select a skill:</label>
                    <select id="skill-select" multiple>
                        {/* {skills.map((skill: { id: number, name: string }) => (
                        <option key={skill.id} value={skill.id}>
                            {skill.name}
                        </option>
                        ))} */}
                    </select> 
                </div>
                <div>
                    <label>Role Listing Open Date</label>
                    <input type='date' name='rl_open' required/>
                </div>
                <div>
                    <label>Role Listing Close Date</label>
                    <input type='date' name='rl_close' required/>
                </div>
                <div>
                    <label>Role Listing Status</label>
                    <select name='rl_status' required>
                        <option value='Open'>Open</option>
                        <option value='Closed'>Closed</option>
                    </select>
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
        </Container>
    );
};

export default CreateRoleListing;