<template>
  <!-- <div data-app class="homepage"> -->
      <v-container grid-list-m>
    <v-layout wrap>
      <v-flex xs12 sm12 md12>
    
<h1>homepage</h1>
 <v-card
    class="mx-auto text-center"
    color="green"
    dark
    max-width="900"
  >
    <v-card-text>
      <v-sheet color="rgba(0, 0, 0, .12)">
        <v-sparkline
          :labels="months"
          :value="value"
          color="rgba(255, 255, 255, .7)"
          height="100"
          padding="24"
          stroke-linecap="round"
          smooth
        >
           <!-- <template v-slot:label="item">
            {{ item.months }}
          </template> -->  
        </v-sparkline>
      </v-sheet>
    </v-card-text>

    <v-card-text>
      <div class="display-1 font-weight-thin">
        Meses
      </div>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions class="justify-center">
      <v-btn
        block
        text
      >
        Go to Report
      </v-btn>
    </v-card-actions>
  </v-card>
      </v-flex>
    </v-layout>
   </v-container>
</template>

<script>

export default {
  name: "Homepage",
  props: {},
 data: () => ({
      value: [
        423,
        446,
        675,
        510,
        590,
        610,
        760,
        760,
        760,
        760,
        760,
        760,
      ],
      months: [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
      ]
    }),
};
</script>

<style scoped>

h3 {
  margin: 0px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
