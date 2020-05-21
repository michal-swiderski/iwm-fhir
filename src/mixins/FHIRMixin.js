import axios from 'axios';

const e = process.env;
const URL = `http://${e.VUE_APP_FHIR_HOST}:${e.VUE_APP_FHIR_PORT}/${e.VUE_APP_FHIR_BASE}`;

export default {
    methods : {
        async fhir_getAllPatients(options = {}) {
            console.log(options)
            const {count, offset, filter} = options;
            const paginationString = `_count=${count}&_getpagesoffset=${offset}`;

            const filterString = filter.length ? `name=${filter}` : ''

            const {data} = await axios.get(`${URL}/Patient?${paginationString}&${filterString}`);
            return {
                total : data.total,
                result : data.total > 0 ? data.entry.map(entry => entry.resource) : []
            }
        },

        async fhir_getPatient(id) {
            const {data} = await axios.get(`${URL}/Patient/${id}/$everything`);
            return data
        }
    }
}