<template>
  <!--eslint-disable-->
  <div class="home">
    <div class="container">
      <div id="main">
        <div class="page-heading">
          <div class="page-content">
            <div class="row">
              <section>
                <div class="row mt-4">
                  <div class="col-6 col-12">
                    <div class="btn btn-secondary">
                      <router-link class="" :to="{ path: '/' }">
                        <button class="btn btn-secondary bi bi-back">
                          Retourner
                        </button></router-link
                      >
                    </div>
                    <div class="card">
                      <div
                        class="card-header"
                        style="background-color: rgb(145, 174, 252)"
                      >
                        <h4>Les Modeles</h4>
                      </div>
                      <table class="table table-hover">
                        <tr>
                          <td>
                            <router-link
                              class="link"
                              :to="{ name: 'addModel' }"
                            >
                              <div class="btn btn-info rounded-pill">
                                <div class="avatar avatar-lg">
                                  <i class="bi bi-plus"></i>
                                </div></div
                            ></router-link>
                          </td>
                        </tr>
                        <thead class="thead-dark">
                          <tr>
                            <th>Nom</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody v-if="models.length">
                          <tr v-for="(model, index) in models">
                            <td>
                              <button
                                @click="modifierNameAction(model)"
                                class="link"
                              >
                                {{ model.name }}
                              </button>
                            </td>

                            <td>
                              <div class="btn btn-success">
                                <router-link
                                  class="link"
                                  :to="{
                                    path: '/modifierNbrChampAction/' + model.id,
                                  }"
                                  ><button class="bi bi-pencil-square"></button
                                ></router-link>
                              </div>
                              &nbsp;&nbsp;&nbsp;
                              <div class="btn btn-danger">
                                <button
                                  class="bi bi-trash"
                                  @click="deleteModel(model)"
                                />
                              </div>

                              &nbsp;&nbsp;&nbsp;
                              <div class="btn btn-outline-secondary">
                                <router-link
                                  class="link"
                                  :to="{
                                    path: '/viewfiltresModel/' + model.id,
                                  }"
                                  ><button class="bi bi bi-eye-slash"></button
                                ></router-link>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                        <tbody v-else="models.length == 0">
                          <tr>
                            <td colspan="4"><h3>Pas de modele!!!</h3></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/*eslint-disable*/
import { ref, onMounted, computed, reactive, SetupContext } from "vue";
import { useStore } from "vuex";
import axios from "axios";

export default {
  emits: ["modelData"],

  setup(props: any, context: SetupContext) {
    const message = reactive({
      name: "",
      email: "",
    });
    const loading = ref(false);
    const load = async (model: any) => {
      loading.value = true;
      const { data } = await axios.get("user");

      await axios.post("find-filtres-ami", {
        ...{ data: { id: data.id, id_modele: model.id } },
      });
      loading.value = false;
    };
    const models = ref([]);
    const filtres = ref([]);
    const store = useStore();
    const auth = computed(() => store.state.auth);
    const modifierNameAction = async (model: any) => {
      context.emit("modelData", model);
    };

    const deleteModel = async (model: any) => {
      let confirmation = confirm("etes-vous sure de supprime ce modele ?!");
      if (confirmation) {
        await axios.delete("model", { ...{ data: model } });
      }
      const Models = await axios.get("model/" + 0);
      models.value = Models.data;
      return models;
    };
    onMounted(async () => {
      const Models = await axios.get("model/" + 0);
      models.value = Models.data;
      const Filtres = await axios.get("liste-filtres");
      filtres.value = Filtres.data;

      try {
        const { data } = await axios.get("user");
        message.name = `${data.first_name}   ${data.last_name}`;
        message.email = `${data.email}`;
        await store.dispatch("setAuth", true);
      } catch (e) {
        await store.dispatch("setAuth", false);
      }
    });

    return {
      message,
      auth,
      models,
      filtres,
      modifierNameAction,
      deleteModel,
      load,
      loading,
    };
  },
};
</script>
<style scoped>
.link {
  font-size: 14px;
  transition: 0.5s ease all;
  padding-bottom: 4px;
  border: 1px solid transparent;
}
</style>

