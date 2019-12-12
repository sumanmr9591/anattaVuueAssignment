<style scoped>
#login-container {
    position: absolute;
    width: 45%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.v-card__title {
    color: #ffffff;
    text-align: center;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    background: #2493cd;
    border-bottom: 2px solid #1D88BF;
    border-top: 2px solid #E8A700;
}

.v-card__actions {
    background: #2493cd;
}

#errorMsg {
    color: red;
}
.spinnerContainer{
    position:relative;
}
.spinnerClass{
    position:absolute;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
}
</style>

<template>
<div id="login-container">
    <v-card>
        <v-card-title>
            <h4 class="display-1">Login</h4>
        </v-card-title>
        <v-card-text>
            <v-form>
                <v-text-field v-model="username" label="Username" prepend-icon="mdi-account-circle" />
                <v-text-field v-model="userpassword" label="Password" :type="showPassword ? 'text' : 'password'" prepend-icon="mdi-lock" :append-icon="showPassword ? 'mdi-eye': 'mdi-eye-off'" @click:append="showPassword= !showPassword" />

            </v-form>
            <p id="errorMsg" v-if="errorMsg">{{errorMsg}}</p>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>

            <v-btn @click="showRegister">Register</v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="authenticate" class="spinnerContainer"> 
                <v-progress-circular
                v-if="loginSpinner"
                class="spinnerClass"
        :indeterminate="true"
        :rotate="rotate"
        :size="32"
        :width="4"
        color="light-blue"
      ></v-progress-circular>Login</v-btn>
        </v-card-actions>
    </v-card>
</div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Login',

    data() {
        return {
            showPassword: false,
            rotate: 0,
            login: true,
            username: '',
            userpassword: '',
            submitStatus: null,
            errorMsg: '',
            loginSpinner: false
        }
    },
    methods: {
        showRegister() {
            this.$router.push('/register');
        },
        authenticate() {
            this.loginSpinner = true;
            this.errorMsg = '';
            if (this.username == 'admin' && this.userpassword == 'admin') {
                this.$router.push('/adminView');
            } else if(!this.username || !this.userpassword){
               this.errorMsg = 'Both username and Password are required in order to proceed!';
               this.loginSpinner = false;
            } else {
                axios.get('/api/users')
                    .then((res) => {
                        let users = res.data;
                        let len = res.data.length;
                        let id;
                        for (let i = 0; i < len; i++) {
                            if (this.username == users[i].name && this.userpassword == users[i].password) {
                                this.errorMsg = '';
                                id = users[i]._id;
                                localStorage.setItem('userinfo', users[i].name);
                                this.$router.push(`/userView/${id}}`);
                            }
                        }
                        if (id == undefined) {
                            this.errorMsg = 'Invalid Username/Password';
                        }
                        this.loginSpinner = false;
                    })
            }
        }
    }
};
</script>
