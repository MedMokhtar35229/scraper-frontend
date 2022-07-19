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
                        <button
                          type="button"
                          class="btn btn-outline-secondary"
                          v-if="!loading"
                          @click="load"
                        >
                          <i class="bi bi-cloud-arrow-down-fill"></i>
                        </button>
                        <loading-page v-if="loading" />
                        <h4>Les Filtres</h4>
                      </div>

                      <div>
                        <table class="table table-hover table-lg">
                          <thead>
                            <tr>
                              <th>Nom Modele</th>
                              <th>Contenu Filtre</th>
                            </tr>
                          </thead>
                          <div class="table-responsive">
                            <tbody class="card-body">
                              <tr v-for="filtre in filtres">
                                <td class="col-auto">
                                  <div class="d-flex align-items-center">
                                    <div
                                      class="avatar avatar-md"
                                      v-for="model in models"
                                    >
                                      <div v-if="filtre.id_modele === model.id">
                                        <h1
                                          style="background-color: powderblue"
                                        >
                                          {{ model.name }}
                                        </h1>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td class="col-auto">
                                  <p class="mb-0">
                                    {{ filtre.contenu }}
                                  </p>
                                </td>
                              </tr>
                            </tbody>
                          </div>
                        </table>
                      </div>
                      <div v-if="!filtres.length">
                        <div><h3>Pas de filtre!!!</h3></div>
                      </div>
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

<script>
import LoadingPage from "./LoadingPage.vue";
import { ref, onMounted, computed, reactive } from "vue";
import { useStore } from "vuex";
import axios from "axios";
import { useRouter } from "vue-router";
export default {
  components: { LoadingPage },

  setup() {
    const models = ref([]);

    const loading = ref(false);
    const filtres = ref([]);
    const store = useStore();
    const auth = computed(() => store.state.auth);
    const load = async () => {
      loading.value = true;
      const { data } = await axios.get("user");
      await axios.post("find-filtres-ami/" + data.id);
      loading.value = false;
    };
    const router = useRouter();

    onMounted(async () => {
      try {
        await axios.get("user");
      } catch (e) {
        await store.dispatch("setAuth", false);
        router.push("/login");
      }
      const Models = await axios.get("model/" + 0);
      models.value = Models.data;
      const { data } = await axios.get("user");
      console.log(data);
      const Filtres = await axios.get("liste-filtres/" + data.id + "/" + 0);
      filtres.value = Filtres.data;

      console.log(filtres);
    });

    return {
      models,
      router,
      filtres,
      loading,
      auth,
      load,
    };
  },
};
</script>

<style scoped>
.home {
  background-color: #fff;
  background-attachment: fixed;
  position: relative;
  height: 100vh;
  overflow-x: hidden;
  margin-top: 0rem;
}
</style>
