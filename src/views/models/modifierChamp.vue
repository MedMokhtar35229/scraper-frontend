<template>
  <!--eslint-disable-->
  <div class="home">
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
                        Modification Champ
                      </h1>
                    </div>
                    <div v-for="champ in champs">
                      <form @submit.prevent="submit(champ)">
                        <div
                          v-if="
                            champ.id === parseInt(route.params.id.toString())
                          "
                        >
                          <div
                            class="
                              form-group
                              position-relative
                              has-icon-left
                              mb-4
                            "
                          >
                            <label>Nom du Champ </label>
                            <input
                              v-model="champ.name"
                              type="name"
                              class="form-control form-control-xl"
                              required
                            />
                            <div class="form-control-icon">
                              <i class="bi bi-book-half"></i>
                            </div>
                          </div>
                          <div
                            class="
                              form-group
                              position-relative
                              has-icon-left
                              mb-4
                            "
                          >
                            <label>Contenu du Champ </label>
                            <input
                              v-model="champ.contenu"
                              type="name"
                              class="form-control form-control-xl"
                              required
                            />
                            <div class="form-control-icon">
                              <i class="bi bi-book-half"></i>
                            </div>
                          </div>

                          <button
                            class="btn btn-primary shadow-lg form-control"
                          >
                            Sauvé
                          </button>
                        </div>
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
  </div>
</template>
              

<script>
/*eslint-disable*/
import { reactive, ref } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { onMounted } from "@vue/runtime-core";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const champs = ref([]);
    const submit = async (champ) => {
      const { data, status } = await axios.put("champ", champ);
      if (status == 200) {
        router.push("/modifierNbrChampAction/" + champ.id_modele);
      }
    };
    onMounted(async () => {
      const Champ = await axios.get("champ");
      champs.value = Champ.data;
    });
    return {
      champs,
      submit,
      route,
      router,
    };
  },
};
</script>

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
<!--Refused to apply style from '<URL>' because its MIME type ('text/html') is not a supported stylesheet MIME type, and strict MIME checking is enabled.-->
