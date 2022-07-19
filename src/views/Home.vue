<template>
  <div class="home">
    <div class="container">
      <div id="main">
        <div class="page-heading">
          <div class="page-content">
            <div class="row">
              <div class="col-12 col-lg-9">
                <div class="row">
                  <div class="col-6 col-lg-4 col-md-6">
                    <div class="card">
                      <div class="card-body px-3 py-4-5">
                        <div class="row">
                          <div class="col-md-4">
                            <div class="stats-icon purple">
                              <i class="bi bi-border-style"></i>
                            </div>
                          </div>
                          <!--eslint-disable-->
                          <div class="col-md-8">
                            <h6 class="text-muted font-semibold">
                              Les Modeles
                            </h6>
                            <router-link
                              class="link"
                              :to="{ name: 'ListModel' }"
                            >
                              <h6 class="font-extrabold mb-0">
                                {{ models.length }}
                              </h6>
                            </router-link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-6 col-lg-4 col-md-6">
                    <div class="card">
                      <div class="card-body px-3 py-4-5">
                        <div class="row">
                          <div class="col-md-4">
                            <div class="stats-icon blue">
                              <i class="bi bi-funnel-fill"></i>
                            </div>
                          </div>
                          <div class="col-md-8">
                            <h6 class="text-muted font-semibold">
                              les Filtres
                            </h6>
                            <router-link
                              class="link"
                              :to="{ name: 'ListeFiltres' }"
                            >
                              <h6 class="font-extrabold mb-0">
                                {{ filtres.length }}
                              </h6></router-link
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col">
                  <div class="col-12">
                    <div class="card">
                      <div
                        class="card-header"
                        style="background-color: rgb(145, 174, 252)"
                      >
                        <h4>Les Nouveaux Filtres</h4>
                      </div>
                      <div class="card-body" v-if="filtres.length">
                        <div class="table-responsive">
                          <table class="table table-hover table-lg">
                            <thead>
                              <tr>
                                <th>N Modele</th>
                                <th>Contenu</th>
                              </tr>
                            </thead>
                            <tbody v-for="(filtre, index) in filtres">
                              <tr v-if="index == 0">
                                <td class="col-auto">
                                  <div class="d-flex align-items-center">
                                    <div
                                      class="avatar avatar-md"
                                      v-for="model in models"
                                    >
                                      <p
                                        class="font-bold ms-3 mb-0"
                                        v-if="model.id == filtre.id_modele"
                                      >
                                        {{ model.name }}
                                      </p>
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
                          </table>
                        </div>
                      </div>
                      <div v-else="!filtres.length">
                        <div><h3>Pas de filtre!!!</h3></div>
                      </div>
                      <div class="px-4">
                        <router-link
                          class="link"
                          :to="{ name: 'ListeFiltres' }"
                        >
                          <button
                            class="btn btn-block btn-xl btn-primary font-bold"
                          >
                            La liste Complet
                          </button></router-link
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-lg-3">
                <div class="card">
                  <div class="card-body py-1 px-4">
                    <div class="d-flex align-items-center">
                      <div class="avatar avatar-xl">
                        <img src="img/2.jpg" style="width: 50px" />
                      </div>
                      <div class="ms-3 name">
                        <h5 class="font-bold">
                          {{ auth ? message.name : "You are not logged in" }}
                        </h5>
                        <h6 class="text-muted mb-0">
                          {{ auth ? message.email : "You are not logged in" }}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card">
                  <div
                    class="card-header"
                    style="background-color: rgb(145, 174, 252)"
                  >
                    <h4>Les Nouveaux Modeles</h4>
                  </div>
                  <div class="card-content pb-2" v-if="models.length">
                    <div v-for="(model, index) in models">
                      <div
                        class="recent-message d-flex px-4 py-3"
                        v-if="index == 0"
                      >
                        <div class="avatar avatar-lg">
                          <i class="bi bi-border-style"></i>
                        </div>
                        <div class="name ms-2">
                          <h5>{{ model.name }}</h5>

                          <h6>N Modele :</h6>
                          <i class="text-muted mb-0">{{ model.id }}</i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-else="!models.length">
                    <div><h3>Pas de modele!!!</h3></div>
                  </div>
                  <div class="px-4">
                    <router-link class="link" :to="{ name: 'ListModel' }">
                      <button
                        class="btn btn-block btn-xl btn-primary font-bold mt-3"
                      >
                        La liste Complet
                      </button></router-link
                    >
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
import { ref, onMounted, computed, reactive } from "vue";
import { useStore } from "vuex";
import axios from "axios";
import { useRouter } from "vue-router";
export default {
  name: "home-item",
  setup() {
    const message = reactive({
      name: "",
      email: "",
    });
    const models = ref([]);
    const filtres = ref([]);
    const store = useStore();
    const router = useRouter();
    const auth = computed(() => store.state.auth);
    onMounted(async () => {
      const Models = await axios.get("model/" + 0);
      models.value = Models.data;
      const { data } = await axios.get("user");

      const Filtres = await axios.get("liste-filtres/" + data.id + "/" + 0);
      filtres.value = Filtres.data;

      try {
        const { data } = await axios.get("user");
        message.name = `${data.first_name}   ${data.last_name}`;
        message.email = `${data.email}`;
        await store.dispatch("setAuth", true);
      } catch (e) {
        await store.dispatch("setAuth", false);
        router.push("/login");
      }
    });

    return {
      message,
      auth,
      models,
      filtres,
    };
  },
};
</script>

<style lang="scss" scoped>
.home {
  background-color: #fff;
  background-attachment: fixed;
  position: relative;
  height: 100vh;
  overflow-x: hidden;
  margin-top: 0rem;

  img {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }
  .hero-text {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #fff;
    h4 {
      text-transform: uppercase;
      font-size: 22px;
      padding-bottom: 4px;
    }
    h2 {
      font-size: 50px;
      @media (min-width: 550px) {
        font-size: 80px;
      }
    }
    hr:nth-child(2) {
      max-width: 365px;
      margin-bottom: 16px;
    }
    hr:nth-child(4) {
      height: 6px;
      background-color: #fff;
      border: none;
      max-width: 85px;
      margin-top: 16px;
    }
  }
}
</style>