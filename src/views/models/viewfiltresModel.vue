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
                      <div class="card-body">
                        <table class="table table-hover table-lg">
                          <thead>
                            <tr>
                              <th>Contenu</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="filtre in filtres">
                              <td class="col-auto">
                                <p class="mb-0" v-text="filtre.contenu"></p>
                              </td>
                            </tr>
                          </tbody>
                          <tbody v-if="filtres.length == 0">
                            Pas de filtre!!!
                          </tbody>
                        </table>
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
import { ref, onMounted, computed, reactive } from "vue";
import { useStore } from "vuex";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
export default {
  setup() {
    const models = ref([]);
    const route = useRoute();
    const router = useRouter();
    const filtres = ref([]);
    const store = useStore();
    const auth = computed(() => store.state.auth);

    onMounted(async () => {
      const Models = await axios.get("model/" + 0);
      models.value = Models.data;
      try {
        const { data } = await axios.get("user");
      } catch (e) {
        await store.dispatch("setAuth", false);
        router.push("/login");
      }
      const { data } = await axios.get("user");
      const Filtres = await axios.get(
        "liste-filtres/" + data.id + "/" + parseInt(route.params.id.toString())
      );
      filtres.value = Filtres.data;
    });

    return {
      models,
      filtres,
      auth,
      route,
      router,
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
