<template>
    <div>
        <v-container>
            <h1 class="my-3 heading">Patients</h1>
            <v-card>
                <v-card-title>
                    <v-spacer></v-spacer>
                    <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="Search"
                            single-line
                            hide-details
                    ></v-text-field>
                </v-card-title>
                <PatientsTable :filter="search"></PatientsTable>
            </v-card>

        </v-container>
    </div>
</template>

<script>

    import PatientsTable from "../components/PatientsTable";
    export default {
        name: "Patients",
        components: {PatientsTable},
        data() {
            return {
                search: ''
            }
        }
    }
</script>

<style scoped>

</style>