import {handleFiltering} from './roleListings';
import {store} from '../mockStore';

describe('filtering function tests', () => {
    it('filtering by role id 1 should return 1 role list', () => {
        const state = store.getState();

        const filteredData = handleFiltering(state.roleListing.rawRoleListings, {
            "role": [1],
            "location": [],
            "department": []
        });
        expect(filteredData.length).toBe(1);
    })
    it('filtering by role id 1 and 2 should return 3 role lists', () => {
        const state = store.getState();

        const filteredData = handleFiltering(state.roleListing.rawRoleListings, {
            "role": [1, 2],
            "location": [],
            "department": []
        });
        expect(filteredData.length).toBe(3);
    })
    it('filtering by role id 1 and 2 and location Singapore should return 2 role list', () => {
        const state = store.getState();

        const filteredData = handleFiltering(state.roleListing.rawRoleListings, {
            "role": [1, 2],
            "location": ["Singapore"],
            "department": []
        });
        expect(filteredData.length).toBe(2);
    })
    it('filtering by role id 1 and 2 and location Singapore and department IT should return 1 role list', () => {
        const state = store.getState();

        const filteredData = handleFiltering(state.roleListing.rawRoleListings, {
            "role": [1, 2],
            "location": ["Singapore"],
            "department": ["IT"]
        });
        expect(filteredData.length).toBe(1);
    })
});
