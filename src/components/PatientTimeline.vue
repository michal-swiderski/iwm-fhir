<template>
    <div>
        <v-progress-linear v-if="loading" indeterminate></v-progress-linear>
        <v-timeline class="mt-3" v-if="!loading">
            <v-timeline-item v-for="item in patientHistory" :key="item.resource.id">
                <v-alert color="blue" outlined>
                    <v-expansion-panels flat>
                        <v-expansion-panel>
                            <v-expansion-panel-header >
                                <div>
                                    <div class="title">{{item.resource.resourceType}}</div>
                                    <div class="overline" v-if="item.resource.resourceType === 'Observation'">
                                        {{item.resource.effectiveDateTime}}
                                    </div>
                                    <div class="overline" v-if="item.resource.resourceType === 'MedicationRequest'">
                                        {{item.resource.authoredOn}}
                                    </div>
                                </div>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <template v-if="item.resource.resourceType === 'Observation'">
                                    <div class="font-weight-bold">{{item.resource.code.text}}:</div>
                                    <template v-if="item.resource.valueQuantity">
                                        {{item.resource.valueQuantity.value}} {{item.resource.valueQuantity.unit}}
                                    </template>
                                    <template v-else-if="item.resource.component">
                                        <div v-for="component in item.resource.component" :key="component">
                                            {{component.code.text}}: {{component.valueQuantity.value}} {{component.valueQuantity.unit}}
                                        </div>
                                    </template>
                                </template>
                                <template v-else-if="item.resource.resourceType === 'MedicationRequest'">
                                    {{item.resource.medicationCodeableConcept.text}}
                                </template>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-alert>
            </v-timeline-item>
        </v-timeline>
    </div>
</template>

<script>
    import FHIRMixin from "../mixins/FHIRMixin";
    import parseISO from "date-fns/parseISO";
    import compareAsc from "date-fns/compareAsc";
    import isWithinInterval from "date-fns/isWithinInterval";
    import isSameDay from "date-fns/isSameDay";

    export default {
        name: "PatientTimeline",
        mixins : [FHIRMixin],
        props : {
            patientId : {
                type : String
            },
            dateRange : {
                type : Array,
                default : () => []
            }
        },
        data() {
            return {
                loading: true,
                observations : [],
                medicationStatements : []
            }
        },
        computed: {
            patientHistory() {
                let sorted = [...this.observations, ...this.medicationStatements].sort((a, b) => {
                    const date_a = a.resource.resourceType === 'Observation' ? a.resource.effectiveDateTime : a.resource.authoredOn;
                    const date_b = b.resource.resourceType === 'Observation' ? b.resource.effectiveDateTime : b.resource.authoredOn;
                    return compareAsc(new Date(date_a), new Date(date_b));
                });
                if(this.dateRange.length === 1) {
                    return sorted.filter(res => {
                        const date = parseISO(this.fhir_getResourceDate(res));
                        console.log(date, Date.parse(this.dateRange[0]), isSameDay(new Date(this.dateRange[0]), date))
                        return isSameDay(Date.parse(this.dateRange[0]), date);
                    });
                }
                else if(this.dateRange.length === 2) {
                    const [from, to] = this.dateRange;
                    return sorted.filter(res => {
                        const date = parseISO(res.resource.effectiveDateTime);
                        if(compareAsc(new Date(from), new Date(to)) === 1) return sorted;
                        return isWithinInterval(date, {start: new Date(from), end : new Date(to)})
                    });
                }
                else return sorted;
            }
        },
        async mounted() {
            this.observations = await this.fhir_getPatientResource(this.patientId, 'Observation');
            this.medicationStatements = await this.fhir_getPatientResource(this.patientId, 'MedicationRequest');
            this.loading = false;
        }
    }
</script>

<style scoped>

</style>