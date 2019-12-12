<style scoped>
#register-container {
    position: absolute;
    width: 40%;
    top: 40%;
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

.link-text {
    color: #ffffff;
    font-size: 15px;
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
.cardHead {
    color: #ffffff;
    text-align: center;
    -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    background: #2493cd !important;
    border-bottom: 2px solid #1D88BF;
    border-top: 2px solid #E8A700;
}

#deleteText {
    font-size: 16px;
    margin-top: 25px;
}
.errorText{
    color: red;
}
</style>

<template>
<div id="register-container">
     <v-dialog v-model="registrationSuccessful" width="500">

        <v-card>
            <v-card-title class="cardHead" primary-title>
                Successfully Registered
            </v-card-title>

            <v-card-text>
                <p id="deleteText">Redirecting you to login page</p>
            </v-card-text>
        </v-card>
    </v-dialog>
    <v-card>
        <v-card-title>
            <h4 class="display-1">Register</h4>
            <v-spacer></v-spacer>
            <router-link to="/">
                <p class="link-text">Back to Login</p>
            </router-link>
        </v-card-title>
        <v-card-text>
            <v-form ref="form" v-model="valid">
                <v-text-field v-model="userData.name" label="Username" prepend-icon="mdi-account-circle" :rules="userData.nameRules" required />
                <v-text-field v-model="userData.email" label="Email" type="email" prepend-icon="mdi-email" :rules="userData.emailRules" required/>
                <v-text-field v-model="userData.company" label="Company" prepend-icon="mdi-bank" :rules="userData.companyRules" required />
                <v-text-field v-model="userData.password" :rules="userData.passwordRules" label="Create Password" :type="showCreatePassword ? 'text' : 'password'" prepend-icon="mdi-lock" :append-icon="showCreatePassword ? 'mdi-eye': 'mdi-eye-off'" @click:append="showCreatePassword= !showCreatePassword" />
                <v-text-field v-model="userData.cpassword" :rules="userData.cpasswordRules" label="Confirm Password" required :type="showConfirmPassword ? 'text' : 'password'" prepend-icon="mdi-lock" :append-icon="showConfirmPassword ? 'mdi-eye': 'mdi-eye-off'" @click:append="showConfirmPassword= !showConfirmPassword" />
                <v-text-field v-model="userData.jobtitle" label="Job Title" :rules="userData.jobRules" required prepend-icon="mdi-account-tie-outline" />
                <v-text-field v-model="userData.address" label="Address" prepend-icon="mdi-map-marker-outline" :rules="userData.addressRules" required />
            </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
            <v-btn @click="register" class="spinnerContainer">
                 <v-progress-circular
                v-if="registerSpinner"
                class="spinnerClass"
        :indeterminate="true"
        :rotate="rotate"
        :size="32"
        :width="4"
        color="light-blue"
      ></v-progress-circular>
                SignUp</v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="reset">Reset</v-btn>
        </v-card-actions>
    </v-card>
</div>
</template>

<script>
import axios from "axios";

export default {
    name: 'Register',
    data: () => ({
        valid: true,
        userData: {
            name: '',
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length > 4) || 'Name must be more than 4 characters',
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            company: '',
            companyRules: [
                v => !!v || 'Company is required',
                v => (v && v.length > 4) || 'Company name must be more than 4 characters',
            ],
            password: '',
            passwordRules: [
                v => !!v || 'Password is required',
                v => (v && v.length > 6) || 'Password must be more than 6 characters',
            ],
            cpassword: '',
            cpasswordRules:[
                v => !!v || 'You need to confirm your password',
            ],
            jobtitle: '',
            jobRules: [
                v => !!v || 'Job Title is required',
                v => (v && v.length > 4) || 'Job Title must be more than 4 characters',
            ],
            address: '',
            addressRules: [
                v => !!v || 'Address is required',
                v => (v && v.length > 10) || 'Name must be more than 10 characters',
            ],
        },
        registerSpinner: false,
        registrationSuccessful: false,
        rotate: 0,
        showCreatePassword: false,
        showConfirmPassword: false

    }),
    methods: {
        
        register() {
            if (this.$refs.form.validate()) {
          
            this.registerSpinner = true;
            this.userData.name = this.userData.name.toLowerCase();
            axios.post('/api/register', this.userData)
                .then((res) => {
                    let user = {
                        name: '',
                        password: '',
                        id: ''
                    };
                    user.name = res.data.name;
                    user.password = res.data.password;
                    user.id = res.data._id;
                    axios.post('/api/addlogin', user)
                        .then(() => {
                            this.registerSpinner = false;
                            this.registrationSuccessful = true;
                            setTimeout(()=>{
                                this.registrationSuccessful = false;
                            this.$router.push(`/`);
                            },3000);
                        })
                })
        }
        },
        reset(){
            this.$refs.form.reset();
        }
    }
}
</script>
