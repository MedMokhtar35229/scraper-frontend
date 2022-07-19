<template>
  <!--eslint-disable-->
  <list-m v-if="!modelData.id" @model-data="updateModel"></list-m>
  <div v-else="modelData.id" :model-data="modelData" class="home">
    <div class="container">
      <div id="main">
        <div class="page-heading">
          <div class="page-content">
            <div class="row">
              <div id="auth row h-100">
                <div class="col-md-6 col-12 mx-auto">
                  <div id="auth-left">
                    <div
                      class="align-items-center"
                      style="
                        margin-bottom: 2rem;
                        padding-right: 0rem;
                        padding-left: 0rem;
                      "
                    >
                      <h1
                        class="d-inline-block text-center card-header text-dark"
                      >
                        Modification Model
                      </h1>
                    </div>

                    <form @submit="submit">
                      <div
                        class="form-group position-relative has-icon-left mb-4"
                      >
                        <label>Nom du Model </label>
                        <input
                          v-model="modelData.name"
                          type="name"
                          class="form-control form-control-xl"
                          required
                        />
                        <div class="form-control-icon">
                          <i class="bi bi-border-style"></i>
                        </div>
                      </div>

                      <button class="btn btn-primary shadow-lg form-control">
                        Sauvé
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import ListM from "./ListM.vue";
import { reactive } from "vue";

import axios from "axios";

export default {
  name: "modifier-model",
  components: {
    ListM,
  },
  setup() {
    const modelData = reactive({
      id: 0,
      name: "",
      nbrchamps: "",
    });

    const mD = reactive({
      id: 0,
      name: "",
      nbrchamps: "",
    });
    const submit = async () => {
      if (modelData.name !== mD.name) {
        await axios.put("model", modelData);
      }
    };
    const updateModel = async (model) => {
      modelData.id = model.id;
      modelData.name = model.name;
      modelData.nbrchamps = model.nbrchamps;
      mD.id = modelData.id;
      mD.name = modelData.name;
    };

    return {
      submit,
      modelData,
      updateModel,
      mD,
    };
  },
};
</script>
<style scoped>
</style>
<style scoped lang="scss">
.home {
  background-color: #fff;
  background-attachment: fixed;
  position: relative;
  height: 100vh;
  overflow-x: hidden;
  color: #fff;
}
</style>

