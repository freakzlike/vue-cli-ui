<template>
  <v-container fluid class="pa-0">
    <jst-row gutter>
      <v-col cols="12">
        <jst-view-card title="CharField" toolbar content-gutter>
          <jst-row gutter>
            <v-col cols="12" md="6" xl="3">
              <jst-view-card title="Display">
                <jst-display-field :field="charField"/>
              </jst-view-card>
            </v-col>

            <v-col cols="12" md="6" xl="3">
              <jst-view-card title="Input">
                <jst-input-field :field="charField"/>
              </jst-view-card>
            </v-col>

            <v-col cols="12" md="6" xl="3">
              <jst-view-card title="Input Single line">
                <jst-row gutter>
                  <v-col cols="12" md="6">
                    Text
                  </v-col>
                  <v-col cols="12" md="6">
                    <jst-input-field :field="charField"
                                     single-line/>
                  </v-col>
                </jst-row>
              </jst-view-card>
            </v-col>

            <v-col cols="12" md="6" xl="3">
              <jst-view-card title="Selection">
                <v-text-field v-model="selection.field"
                              label="label"
                              hint="hint"
                              persistent-hint/>
              </jst-view-card>
            </v-col>
          </jst-row>
        </jst-view-card>
      </v-col>

      <v-col cols="12">
        <jst-view-card title="NumericField" toolbar content-gutter>
          <jst-row gutter>
            <v-col cols="12" md="6" xl="3">
              <jst-view-card title="Display">
                <jst-display-field :field="numericField"/>
              </jst-view-card>
            </v-col>

            <v-col cols="12" md="6" xl="3">
              <jst-view-card title="Input">
                <jst-input-field :field="numericField"/>
              </jst-view-card>
            </v-col>

            <v-col cols="12" md="6" xl="3">
              <jst-view-card title="Input Single line">
                <jst-row gutter>
                  <v-col cols="12" md="6">
                    Text
                  </v-col>
                  <v-col cols="12" md="6">
                    <jst-input-field :field="numericField"
                                     single-line/>
                  </v-col>
                </jst-row>
              </jst-view-card>
            </v-col>

            <v-col cols="12" md="6" xl="3">
              <jst-view-card title="Selection">
                <v-text-field v-model="selection.field"
                              label="label"
                              hint="hint"
                              persistent-hint/>
              </jst-view-card>
            </v-col>
          </jst-row>
        </jst-view-card>
      </v-col>

      <v-col cols="12">
        <jst-view-card title="ChoiceField" toolbar content-gutter>
          <jst-row gutter>
            <v-col cols="12" md="6" xl="3">
              <jst-view-card title="Display">
                <jst-display-field :field="choiceField"/>
              </jst-view-card>
            </v-col>

            <v-col cols="12" md="6" xl="3">
              <jst-view-card title="Input">
                <jst-input-field :field="choiceField"/>
              </jst-view-card>
            </v-col>

            <v-col cols="12" md="6" xl="3">
              <jst-view-card title="Input Single line">
                <jst-row gutter>
                  <v-col cols="12" md="6">
                    Text
                  </v-col>
                  <v-col cols="12" md="6">
                    <jst-input-field :field="choiceField" single-line/>
                  </v-col>
                </jst-row>
              </jst-view-card>
            </v-col>

            <v-col cols="12" md="6" xl="3">
              <jst-view-card title="Selection">
                <jst-multi-select v-model="selection.choice"
                                  label="label"
                                  hint="hint"
                                  :items="choiceFieldItems"/>
              </jst-view-card>
            </v-col>
          </jst-row>
        </jst-view-card>
      </v-col>

      <v-col cols="12">
        <jst-view-card title="BooleanField" toolbar content-gutter>
          <jst-row gutter>
            <v-col cols="12" md="6" xl="3">
              <jst-view-card title="Display">
                <jst-display-field :field="booleanField"/>
              </jst-view-card>
            </v-col>

            <v-col cols="12" md="6" xl="3">
              <jst-view-card title="Input">
                <jst-input-field :field="booleanField"/>
              </jst-view-card>
            </v-col>

            <v-col cols="12" md="6" xl="3">
              <jst-view-card title="Input Single line">
                <jst-row gutter>
                  <v-col cols="12" md="6">
                    Text
                  </v-col>
                  <v-col cols="12" md="6">
                    <jst-input-field :field="booleanField" single-line/>
                  </v-col>
                </jst-row>
              </jst-view-card>
            </v-col>

            <v-col cols="12" md="6" xl="3">
              <jst-view-card title="Selection">
                <v-select v-model="selection.boolean"
                          label="label"
                          hint="hint"
                          persistent-hint
                          :items="booleanFieldItems"
                          :menu-props="{'offset-y': true}"/>
              </jst-view-card>
            </v-col>
          </jst-row>
        </jst-view-card>
      </v-col>

      <v-col cols="12">
        <jst-view-card title="All display fields" toolbar content-gutter>
          <jst-row gutter>
            <v-col cols="6" md="3" xl="2">
              <jst-display-field :field="charField"/>
            </v-col>
            <v-col cols="6" md="3" xl="2">
              <jst-display-field :field="choiceField"/>
            </v-col>
            <v-col cols="6" md="3" xl="2">
              <jst-display-field :field="booleanField"/>
            </v-col>
          </jst-row>
        </jst-view-card>
      </v-col>

      <v-col cols="12">
        <jst-view-card title="All input fields" toolbar content-gutter>
          <jst-row gutter>
            <v-col cols="6" md="3" xl="2">
              <div>
                <jst-input-field :field="charField"/>
              </div>
            </v-col>
            <v-col cols="6" md="3" xl="2">
              <div>
                <jst-input-field :field="choiceField"/>
              </div>
            </v-col>
            <v-col cols="6" md="3" xl="2">
              <div>
                <jst-input-field :field="booleanField"/>
              </div>
            </v-col>
          </jst-row>
        </jst-view-card>
      </v-col>
    </jst-row>
  </v-container>
</template>

<script>
  import {JstDisplayField} from '@/components/fields/display'
  import {JstInputField} from '@/components/fields/input'
  import fields from '@/fields'

  export default {
    name: 'FieldComponentsView',
    components: {JstDisplayField, JstInputField},
    data () {
      return {
        selection: {
          field: null,
          choice: [],
          boolean: null
        },
        choiceFieldItems: [
          {text: 'Value 1', value: 0},
          {text: 'Value 2', value: 1},
          {text: 'Value 3', value: 20},
          {text: 'Value 4', value: 3},
          {text: 'Value 5', value: 4},
          {text: 'Value 6', value: 50},
          {text: 'Value 7', value: 6},
          {text: 'Value 8', value: 7},
          {text: 'Value 9', value: 8}
        ],
        booleanFieldItems: [
          {text: 'Both', value: null},
          {text: 'No', value: true},
          {text: 'Yes', value: false}
        ],
        fieldInputData: {
          char: this.getLazyFunction('lazy text', 1000),
          choice: this.getLazyFunction(50, 500),
          boolean: true,
          numeric: 35
        }
      }
    },
    computed: {
      charField () {
        return new fields.CharField(
          {
            name: 'char',
            label: 'label',
            hint: 'Hint',
            options: {
              prefix: this.getLazyFunction('Prefix', 1000),
              suffix: this.getLazyFunction('Suffix', 1000)
            }
          },
          this.fieldInputData
        )
      },
      numericField () {
        return new fields.NumericField(
          {
            name: 'numeric',
            label: 'label',
            hint: 'Hint',
            options: {
              prefix: this.getLazyFunction('Prefix', 1000),
              suffix: this.getLazyFunction('Suffix', 1000)
            }
          },
          this.fieldInputData
        )
      },
      choiceField () {
        return new fields.ChoiceField(
          {
            name: 'choice',
            label: this.getLazyFunction('Label', 1000),
            hint: 'Hint',
            options: {
              suffix: this.getLazyFunction('Suffix', 1000),
              choices: this.getLazyFunction(this.choiceFieldItems, 1000)
            }
          },
          this.fieldInputData
        )
      },
      booleanField () {
        return new fields.BooleanField(
          {
            name: 'boolean',
            label: 'Label',
            hint: this.getLazyFunction('Hint', 1000)
          },
          this.fieldInputData
        )
      }
    },
    methods: {
      getLazyFunction (result, timeout) {
        return () => new Promise(resolve => setTimeout(() => resolve(result), timeout))
      }
    }
  }
</script>
