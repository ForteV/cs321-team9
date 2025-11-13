import { getJSON, postJSON } from './client';

//this is the contrac
//  GET  /api/records?limit=50 -> { items: [{id,category,date,notes,created_at}] }
//  POST /api/records          -> { id,category,date,notes,created_at }

//-------------Forte, you can delete this section and put database-------------
const LS_KEY = 'records_dev';

function lsList() {
    const items = JSON.parse(localStorage.getItem(LS_KEY) || '[]');
    return { items };
}

function lsCreate({ category, date, notes }) {
    const items = JSON.parse(localStorage.getItem(LS_KEY) || '[]');
    const rec = {
        id: (items[0]?.id || 0) + 1,
        category, date, notes,
        created_at: new Date().toISOString(),
    };

    localStorage.setItem(LS_KEY, JSON.stringify([rec, ...items]));
    return rec;
}

//----------------until here-------------------

export const RecordsAPI = {
    // ---- forte delete from here -=---
    async list(limit = 50) {
        try {
            return await getJSON(`/records?limit=${limit}`);
        } 
    
        catch {
            const { items } = lsList();
            return { items: items.slice(0, limit) };
        }
    },

    async create({ category, date, notes }) {
        try {
            return await postJSON('/records', { category, date, notes });
        }

        catch {
            return lsCreate({ category, date, notes });
        }
    }
    // --- until here ---

    // uncomment this when database ready forte
        //list: (limit = 50) => getJSON(`/records?limit=${limit}`),
        //create: ({ category, date, notes }) =>
        //postJSON('/records', { category, date, notes }),

};
