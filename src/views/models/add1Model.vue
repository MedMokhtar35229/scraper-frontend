<template>
  <!--eslint-disable-->
  <div id="auth row h-100">
    <div class="col-md-6 col-12 mx-auto">
      <div id="auth-left">
        <div
          class="align-items-center"
          style="margin-bottom: 2rem; padding-right: 0rem; padding-left: 0rem"
        >
          <h1 class="d-inline-block text-center card-header text-dark">
            Nouveau Model
          </h1>
        </div>

        <form @submit.prevent="submit" @submit.event="reset">
          <div class="form-group position-relative has-icon-left mb-4">
            <label :class="{ 'text-danger': m }">Nom du Model </label>
            <input
              :class="{ 'is-invalid': m }"
              v-model="modele.name"
              type="name"
              class="form-control form-control-xl"
              placeholder="Nom du Model"
              required
            />
            <div class="form-control-icon">
              <i class="bi bi-border-style"></i>
            </div>
            <div class="invalid-tooltip">Déjà ajouté</div>
          </div>
          <div class="form-group position-relative has-icon-left mb-4">
            <label :class="{ 'text-danger': m }">Nombre des Champs </label>
            <input
              required
              v-model="modele.nbrchamps"
              type="number"
              class="form-control form-control-xl"
              placeholder="Nombre des Champs"
            />
            <div class="form-control-icon">
              <i class="bi bi-list-ol"></i>
            </div>
          </div>

          <button class="btn btn-primary shadow-lg form-control">Sauvé</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { reactive, ref, SetupContext } from "vue";
import axios from "axios";

export default {
  name: "add-1-model",
  emits: ["modeleData", "success"],
  setup(props: any, context: SetupContext) {
    const modele = reactive({
      id: 0,
      name: "",
      nbrchamps: 0,
    });
    const m = ref(false);
    const reset = () => {
      modele.name = "";
      modele.nbrchamps = 0;
    };
    const submit = async () => {
      const { data, status } = await axios.post("model", modele);
      if (status !== 200) {
        m.value = true;
      }
      context.emit("modeleData", data);
    };

    return {
      modele,
      submit,
      m,
      reset,
    };
  },
};
</script>
