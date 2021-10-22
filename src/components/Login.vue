<template>
  <!--popup start for login-->
  <div>
    <b-container>
      <!-- <b-modal  title="Login" hide-footer> -->
      <h1>Login</h1>
      <div>
          <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" ></GoogleLogin>
        </div><br>
      <b-form ref="form">
        <b-form-group label="UserName:">
          <b-form-input type="text" v-model="check.username" placeholder="Enter your Username"></b-form-input>
        </b-form-group>
        <br />

        <b-form-group label="Password:">
          <b-form-input type="password" v-model="check.password" placeholder="Enter your Password"></b-form-input>
        </b-form-group>
        <br />

        <div class="text-center">
          <b-button variant="outline-success" @click="signin()">Submit</b-button>
          <b-button variant="outline-danger" class="mx-3">Reset</b-button>
        </div>
      </b-form>
      <!-- </b-modal> -->
    </b-container>
  </div>
  <!--popup end for login-->
</template>

<script>
import axios from 'axios'
import GoogleLogin from 'vue-google-login';
export default {
  name: "Login",
  components: {
      GoogleLogin
  },
  data() {
    return {
      check: {
        username: "",
        password: ""
      },
    params: {
            client_id: "49546361651-4p0pe5068atf5l501b3kbaom3ssofsc3.apps.googleusercontent.com"
        },
        // only needed if you want to render the button with the google ui
        renderParams: {
            width: 250,
            height: 50,
            longtitle: true
        }      
    }
  },
  methods: {
      signin: function() {
         var ax = axios.create({
            baseURL: "http://localhost:9091",
        });
        
        return new Promise((resolve, reject) => {
             const username = 'Raj'
             const password = 'Password'
             const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')
             const url = 'http://localhost:9091'
            ax.get (url, {
                headers: {
                    'Authorization': `Basic ${token}` 
                }
            })
            .then((response) => {
                console.log (response.data);                 
                resolve(response);
            }).catch((err) => {
                reject(err);
            })
        })      
    },
  onSuccess(googleUser) {
            console.log(googleUser);
 
            // This only gets the user information: id, name, imageUrl and email
            console.log(googleUser.getBasicProfile());
        }
 }
}

</script>