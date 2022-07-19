<template>
  <section>
    <div class="row mt-4">
      <div class="col-6 col-12">
        <div class="col-md-6 col-lg-3">
          <div class="card">
            <div class="card-body py-1 px-4">
              <div class="d-flex align-items-center">
                <div class="avatar avatar-xl">
                  <img src="img/2.jpg" style="width: 50px" />
                </div>
                <div class="ms-3 name">
                  <h5 class="font-bold text-dark">
                    {{ auth ? message.name : "You are not logged in" }}
                  </h5>
                  <h6 class="text-muted mb-0">
                    {{ auth ? message.email : "You are not logged in" }}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
/* eslint-disable */
import { ref, onMounted, computed, reactive } from "vue";
import { useStore } from "vuex";
import axios from "axios";
export default {
  name: "home-item",
  setup() {
    const message = reactive({
      name: "",
      email: "",
    });
    const store = useStore();
    const auth = computed(() => store.state.auth);
    onMounted(async () => {
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
    };
  },
};
</script>

