<template>
    <v-data-table
            :headers="tableHeaders"
            :items="patientsTableData"
            :server-items-length="total"
            :options.sync = "options"
            :loading="loading"
            @click:row="$router.push('/patient/' + $event.id)"
            class="elevation-1"
    ></v-data-table>
</template>

<script>
    import FHIRMixin from "../mixins/FHIRMixin";

    export default {
        name: "PatientsTable",
        mixins : [FHIRMixin],
        props: ['filter'],
        data() {
            return {
                patients : [],
                tableHeaders : [
                    {text: 'First name', value: 'firstName'},
                    {text: 'Last name', value: 'lastName'},
                    {text: 'Birth date', value: 'birthDate'},
                ],
                options : {},
                loading : true,
                total : 0
            }
        },
        watch : {
            options : {
                handler() {
                    this.fetchPatients();
                },
                deep: true
            },
            filter() {
                this.fetchPatients();
            }
        },
        methods : {
            async fetchPatients() {
                this.loading = true;
                const {result, total} = await this.fhir_getAllPatients({
                    count : this.options.itemsPerPage,
                    offset : this.options.itemsPerPage * (this.options.page - 1),
                    filter : this.filter
                });
                this.patients = result;
                this.total = total;
                this.loading = false;
            }
        },
        mounted() {

        },
        computed : {
            patientsTableData() {
                return this.patients.map(patient => ({
                    id: patient.id,
                    firstName : patient.name[0].given[0].replace(/[0-9]/gi, ''),
                    lastName : patient.name[0].family.replace(/[0-9]/gi, ''),
                    birthDate : patient.birthDate
                }));
            }
        },
        filters : {
            removeDigits(value) {
                return value.replace(/[0-9]/, '');
            }
        }
    }
</script>

<style scoped>

</style>