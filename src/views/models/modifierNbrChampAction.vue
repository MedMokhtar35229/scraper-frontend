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
                      <router-link class="" :to="{ path: '/ListModel' }">
                        <button class="btn btn-secondary bi bi-back">
                          Retourner
                        </button></router-link
                      >
                    </div>
                    <div class="card">
                      <div
                        class="card-header"
                        style="background-color: rgb(145, 174, 252)"
                        v-for="model in models"
                      >
                        <h4
                          v-if="
                            model.id == parseInt(route.params.id.toString())
                          "
                        >
                          {{ model.name }}
                        </h4>
                      </div>
                      <table class="table table-hover">
                        <tr>
                          <td>
                            <router-link
                              class="link"
                              :to="{
                                path: '/addChamp/' + route.params.id,
                              }"
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
                            <th>contenu du champ</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody v-if="champs.length">
                          <tr v-for="(champ, index) in champs">
                            <template
                              v-if="
                                champ.id_modele ===
                                parseInt(route.params.id.toString())
                              "
                            >
                              <td>
                                {{ champ.name }}
                              </td>

                              <td>
                                {{ champ.contenu }}
                              </td>

                              <td>
                                <div class="btn btn-success">
                                  <router-link
                                    class="link"
                                    :to="{
                                      path: '/modifierChamp/' + champ.id,
                                    }"
                                    ><button
                                      class="bi bi-pencil-square"
                                    ></button
                                  ></router-link>
                                </div>
                                &nbsp;&nbsp;&nbsp;
                                <div class="btn btn-danger">
                                  <button
                                    class="bi bi-trash"
                                    @click="deleteChamp(champ)"
                                  />
                                </div>
                              </td>
                            </template>
                          </tr>
                        </tbody>
                        <tbody v-else="champs.length == 0">
                          <tr>
                            <td colspan="4"><h3>Pas de champ!!!</h3></td>
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
import { onMounted, reactive, ref, SetupContext } from "vue";

import axios from "axios";
import { useRoute } from "vue-router";

export default {
  emits: ["modelData"],
  setup(props: any, context: SetupContext) {
    let champs = ref([]);
    let route = useRoute();
    const models = ref([]);

    const deleteChamp = async (champ: any) => {
      let confirmation = confirm("etes-vous sure de supprime ce chmap ?!");
      if (confirmation) {
        await axios.delete("champ", { ...{ data: champ } });
      }
      const Champs = await axios.get("champ");
      champs.value = Champs.data;
    };
    onMounted(async () => {
      const Champs = await axios.get("champ");
      champs.value = Champs.data;
      const Models = await axios.get("model/" + 0);
      models.value = Models.data;
    });
    return {
      champs,
      route,
      deleteChamp,
      models,
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
.home {
  background-color: #fff;
  background-attachment: fixed;
  position: relative;
  height: 100vh;
  overflow-x: hidden;
  color: #fff;
}
</style>

