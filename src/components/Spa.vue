<template>
  <v-container class="fill-height" style="background-color: bisque">
    <v-responsive class="d-flex align-center text-center fill-height">

      <div class="text-body-2 font-weight-light">Welcome to</div>

      <h1 class="text-h2 font-weight-bold">Chat App</h1>

      <v-row class="d-flex align-center justify-center" v-if="!loggedIn">
        <v-col cols="auto">
          <v-card width="700" height="700">
            <template v-slot:title>
              <v-switch
                v-model="model"
                hide-details
                inset
                :label="model ? Login : Register"
              ></v-switch>
            </template>

            <template v-slot:text>
              <v-form
                v-model="form"
                @submit.prevent="onSubmit"
              >
                <v-text-field
                  v-model="username"
                  :readonly="loading"
                  :rules="[required]"
                  class="mb-2"
                  clearable
                  label="Username"
                ></v-text-field>

                <v-text-field
                  v-model="password"
                  :readonly="loading"
                  :rules="[required]"
                  clearable
                  label="Password"
                  placeholder="Enter your password"
                ></v-text-field>

                <v-text-field
                  v-if="!model"
                  v-model="fname"
                  :readonly="loading"
                  :rules="[required]"
                  class="mb-2"
                  clearable
                  label="First Name"
                ></v-text-field>

                <v-text-field
                  v-if="!model"
                  v-model="lname"
                  :readonly="loading"
                  :rules="[required]"
                  class="mb-2"
                  clearable
                  label="Last Name"
                ></v-text-field>

                <br>

                <v-btn
                  :disabled="!form"
                  :loading="loading"
                  block
                  color="success"
                  size="large"
                  type="submit"
                  variant="elevated"
                >
                  Sign In
                </v-btn>
              </v-form>
            </template>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="d-flex align-center justify-center" v-else>
        <v-col cols="auto">
          <v-card width="700" height="700">
            <template v-slot:text>
              <div v-if="!onChat">
                <chat-prev />
              </div>
              <div v-else>
                <chat-main />
              </div>
              <v-form
                v-if="onChat"
                v-model="form"
                @submit.prevent="onSubmit"
              >

                <br>

                <v-btn
                  :loading="loading"
                  block
                  color="success"
                  size="large"
                  type="submit"
                  variant="elevated"
                >
                  Send!
                </v-btn>
              </v-form>
            </template>
          </v-card>
        </v-col>
      </v-row>

    </v-responsive>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    loggedIn: true,
    form: false,
    username: null,
    password: null,
    model: true,
    fname: null,
    lnane: null,
    onChat: false,
    chatTeaser: [],
    chats: [],
  }),
  methods: {
    async doApiCall(path, post=false) {
      try {
        const response = post ? await axios.post(
          'http://localhost:8080/' + path
        ) : await axios.get(
          'http://localhost:8080/' + path
        );
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },

    async loginUser() {
      this.doApiCall('loginUser', true)

    },
    async checkToken() {
      this.doApiCall('checkLoginToken', true)

    },
    async createUser() {
      this.doApiCall('createUser', true)

    },
    async getChatTeaser() {
      this.doApiCall('getMessageTeaser')

    },
    async getChat() {
      this.doApiCall('getMessages')

    },
    async sendMessage() {
      this.doApiCall('sendMessage', true)

    }
  },
}
</script>
