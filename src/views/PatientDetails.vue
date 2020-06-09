<template>
    <v-container>
        <div v-if="loading">Loading...</div>
        <template v-else>
            <h1 class="my-4">{{patientName}}</h1>
            <v-card>
                <v-card-title>Patient's data</v-card-title>
                <v-card-text>
                    Birth date : {{patientData.birthDate}}<br>
                    Address : {{patientAddress}}<br>
                    Phone number : {{patientData.telecom[0].value}}
                </v-card-text>
            </v-card>
            <DateFilter v-model="dateRange" v-on:clear="dateRange = []"></DateFilter>
            <PatientTimeline :patientId="$route.params.id" :dateRange="dateRange"></PatientTimeline>
        </template>
    </v-container>
</template>

<script>
    import FHIRMixin from "../mixins/FHIRMixin";
    import PatientTimeline from "../components/PatientTimeline";
    import DateFilter from "../components/DateFilter";

    export default {
        name: "PatientDetails",
        components: {DateFilter, PatientTimeline},
        mixins: [FHIRMixin],
        data() {
            return {
                loading: true,
                patientData: null,
                dateRange: []
            }
        },
        computed: {
            patientName() {
                return (this.patientData.name[0].given[0] + ' ' + this.patientData.name[0].family).replace(/[0-9]/gi, '');
            },
            patientAddress() {
                const {line, city, state, country} = this.patientData.address[0];
                return `${line.join('\n')}\n${city}\n${state}\n${country}`
            }
        },
        async mounted() {
            this.patientData = await this.fhir_getPatient(this.$route.params.id)
            this.loading = false;
        }
    }
</script>

<style scoped>

</style>