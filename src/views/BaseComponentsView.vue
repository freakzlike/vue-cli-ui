<template>
  <v-container fluid class="pa-0">
    <jst-row>
      <v-col>
        Buttons
      </v-col>
    </jst-row>
    <jst-row>
      <jst-button text="property" class="ma-2" left-icon="done"/>

      <jst-button cancel class="ma-2">
        <v-icon left>mdi-label</v-icon>
        Text
      </jst-button>

      <jst-button text="success" class="ma-2" success right-icon="mdi-account"/>
    </jst-row>

    <jst-row class="mt-3">
      <v-col>
        Icon Buttons
      </v-col>
    </jst-row>
    <jst-row>
      <jst-icon-button icon="done" text="tooltip Text"/>
      <jst-icon-button icon="done" success/>
      <jst-icon-button icon="mdi-keyboard-backspace" primary/>
      <div>
        <span>Inline text</span>
        <jst-icon-button icon="cancel" cancel inline/>
      </div>
    </jst-row>

    <jst-row class="mt-3">
      <v-col>
        Tooltips
      </v-col>
    </jst-row>
    <jst-row>
      <v-col>
        <jst-tooltip text="Tooltip text">
          <template v-slot:default="{ on }">
            <span v-on="on">Random text</span>
          </template>
        </jst-tooltip>
      </v-col>
      <v-col>
        <jst-tooltip :text="lazyTooltip">
          <template v-slot:default="{ on }">
            <span v-on="on">Lazy tooltip</span>
          </template>
        </jst-tooltip>
      </v-col>
    </jst-row>

    <jst-row class="mt-3">
      <v-col>
        Loading
      </v-col>
    </jst-row>
    <jst-row>
      <v-col cols="6">
        <jst-circular-loading/>
      </v-col>
      <v-col cols="6">
        <div>
          Inline text
          <jst-circular-loading inline/>
        </div>
        <div>Other Text</div>
      </v-col>
    </jst-row>

    <jst-row class="mt-3">
      <v-col>
        Cards
      </v-col>
    </jst-row>
    <jst-row>
      <v-col>
        <jst-view-card title="Details" content-gutter>
          <jst-row gutter>
            <v-col cols="6">
              <jst-button v-if="!loadLazyCard" text="Load lazy card" @click="loadLazyCard = true"/>
              <jst-view-card v-else :title="lazyCardTitle" :loading="cardLoading">
                <div>Text</div>
                <jst-button text="Toggle loading" @click="cardLoading = !cardLoading"/>
              </jst-view-card>
            </v-col>

            <v-col cols="6">
              <jst-view-card no-content-padding>
                <template v-slot:title>
                  Titel
                </template>
                <div style="height: 100%; width: 100%;" class="primary">
                  no content padding
                </div>
                <template v-slot:actions>
                  <v-spacer/>
                  <jst-button text="cancel" cancel/>
                  <jst-icon-button icon="done" success/>
                </template>
              </jst-view-card>
            </v-col>
          </jst-row>
        </jst-view-card>
      </v-col>
    </jst-row>

    <jst-row class="mt-3">
      <v-col>
        Toolbar Cards
      </v-col>
    </jst-row>

    <jst-row gutter>
      <v-col>
        <jst-view-card toolbar title="Toolbar title">
          <template v-slot:toolbar-suffix>
            <jst-icon-button icon="more"/>
          </template>
          Content
        </jst-view-card>
      </v-col>
      <v-col>
        <jst-button v-if="!loadLazyToolbarCard" text="Load lazy card" @click="loadLazyToolbarCard = true"/>
        <jst-view-card v-else toolbar :title="lazyToolbarCardTitle" :loading="toolbarCardLoading">
          <template v-slot:toolbar-prefix>
            <jst-icon-button icon="keyboard_arrow_down"/>
          </template>
          <template v-slot:toolbar-suffix>
            <jst-icon-button icon="update"/>
            <jst-icon-button icon="more"/>
          </template>

          <div>Content</div>
          <jst-button text="Toggle loading" @click="toolbarCardLoading = !toolbarCardLoading"/>

          <template v-slot:actions>
            <v-spacer/>
            <jst-button text="cancel" cancel right-icon="cancel"/>
            <jst-button text="done" success right-icon="done"/>
          </template>
        </jst-view-card>
      </v-col>
    </jst-row>
  </v-container>
</template>

<script>
  export default {
    name: 'BaseComponentsView',
    data () {
      return {
        lazyTooltip: () => new Promise(resolve => setTimeout(() => resolve('Lazy Tooltip'), 3000)),
        loadLazyCard: false,
        cardLoading: false,
        lazyCardTitle: () => new Promise(resolve => setTimeout(() => resolve('Lazy Title'), 2000)),
        loadLazyToolbarCard: false,
        toolbarCardLoading: false,
        lazyToolbarCardTitle: () => new Promise(resolve => setTimeout(() => resolve('Lazy Title'), 2000))
      }
    }
  }
</script>
