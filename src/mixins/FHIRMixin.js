import axios from 'axios';

const e = process.env;
const URL = `http://${e.VUE_APP_FHIR_HOST}:${e.VUE_APP_FHIR_PORT}/${e.VUE_APP_FHIR_BASE}`;

export default {
    methods : {
        async fhir_getAllPatients() {
            const {data} = await axios.get(`${URL}/Patient`);
            return data.entry.map(entry => entry.resource)
        },

        async fhir_getPatient(id) {
            const {data} = await axios.get(`${URL}/Patient/${id}/$everything`);
            return data
        }
    }
}