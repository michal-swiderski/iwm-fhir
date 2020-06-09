<template>
    <div>
        <v-container fluid>
            <v-row>
                <v-col cols="4">
                    <v-menu
                            ref="menu"
                            v-model="menu"
                            :close-on-content-click="false"
                            :return-value.sync="dates"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                    v-model="dateRangeText"
                                    label="Date range"
                                    readonly
                                    v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker v-model="dates" no-title scrollable range>
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                            <v-btn text color="primary" @click="$refs.menu.save(dates)">OK</v-btn>
                        </v-date-picker>
                    </v-menu>
                </v-col>
                <v-col>
                    <v-btn outlined color="blue" v-on:click="$emit('clear')">Clear</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    export default {
        name: "DateFilter",
        props: ['range'],
        model : {
            prop: 'range',
            event : 'rangeSelected'
        },
        data() {
            return {
                dates : [],
                menu: false
            }
        },
        computed: {
            dateRangeText () {
                return this.dates.join(' ~ ')
            },
        },
        watch : {
            dates(d) {
              this.$emit('rangeSelected', d);
            },
            range() {
              this.dates = this.range;
            }
        },
        created() {
            this.dates = this.range;
        }
    }
</script>

<style scoped>

</style>