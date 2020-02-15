<template>
  <v-container fluid class="pa-0">
    <jst-row gutter>
      <jst-button text="get fruits" class="ma-1" @click="getFruits"/>
      <jst-button text="filter fruits" class="ma-1" @click="getFruitsFilter"/>
      <v-text-field v-model="filterValue"/>
    </jst-row>

    <jst-row gutter>
      <v-col>Name</v-col>
      <v-col>Description</v-col>
      <v-col>Quantity</v-col>
      <v-col></v-col>
    </jst-row>

    <v-divider/>

    <template v-for="(fruit, fruitIndex) in fruits">
      <jst-row gutter :key="fruitIndex">
        <v-col>
          {{ fruit.name }}
        </v-col>
        <v-col>
          {{ fruit.description }}
        </v-col>
        <v-col>
          {{ fruit.quantity }}
        </v-col>
        <v-col>
          <jst-icon-button text="delete" icon="delete" inline @click="deleteFruit(fruit)"/>
        </v-col>
      </jst-row>
    </template>

    <v-divider/>

    <jst-row gutter>
      <v-col>
        <v-text-field v-model="newFruit.name"
                      label="Name"/>
      </v-col>
      <v-col>
        <v-text-field v-model="newFruit.description"
                      label="Description"/>
      </v-col>
      <v-col>
        <v-text-field v-model="newFruit.quantity"
                      label="Quantity"/>
      </v-col>
      <v-col class="d-flex align-center">
        <jst-button text="Add" left-icon="add" success @click="createFruit"/>
      </v-col>
    </jst-row>
  </v-container>
</template>

<script>
  const FRUIT_URL = 'http://localhost:8080/fruits/'

  export default {
    name: 'QuarkusIOView',
    data () {
      return {
        fruits: [],
        filterValue: null,
        newFruit: {
          name: null,
          description: null,
          quantity: null
        }
      }
    },
    methods: {
      resetNewFruit () {
        this.newFruit.name = null
        this.newFruit.description = null
        this.newFruit.quantity = null
      },
      async getFruits () {
        return this.$http.get(FRUIT_URL).then(response => {
          this.setFruitsFromResponse(response)
        }, response => {
          console.error('response', response)
        })
      },
      async getFruitsFilter () {
        return this.$http.get(FRUIT_URL + 'filter/' + this.filterValue + '/').then(response => {
          this.setFruitsFromResponse(response)
        }, response => {
          console.error('response', response)
        })
      },
      async createFruit () {
        return this.$http.post(FRUIT_URL, this.newFruit).then(response => {
          this.resetNewFruit()
          this.setFruitsFromResponse(response)
        }, response => {
          console.error('response', response)
        })
      },
      async deleteFruit (fruit) {
        return this.$http.delete(FRUIT_URL, {body: fruit}).then(response => {
          this.setFruitsFromResponse(response)
        }, response => {
          console.error('response', response)
        })
      },
      setFruitsFromResponse (response) {
        if (typeof response.body === 'object' && Array.isArray(response.body)) {
          this.fruits = response.body
        } else {
          console.error('Unexpected data type')
        }
      }
    }
  }
</script>
