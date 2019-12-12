<style scoped>
#userText {
    margin-top: 10px;
    color: #ffffff;
    font-size: 18px;
}

th {
    text-align: left;
    padding-top: 2px;
    padding-bottom: 2px;
    border: 0;
    text-transform: uppercase;
    font-size: 11px;
    color: #8c969d !important;
    background-color: black;
    height: 20px;
}

tr {
    background: #2d333a;
    color: #c9cccd;
}

tr:hover {
    color: #2d333a;
}

#logout {
    float: right;
}
</style>
<template>
<div>
    <div id="bar">
        <v-btn @click="logoutUser" id="logout" color="primary">Logout</v-btn>
    </div>
    <div>
        <p id="userText">User View for {{userData.name}}</p>

    </div>

    <v-simple-table>

        <template v-slot:default>
            <tbody>
                <tr>
                    <td class="text-left">Name</td>
                    <td class="text-left">{{userData.name}}</td>
                </tr>
                <tr>
                    <td class="text-left">Email</td>
                    <td class="text-left">{{userData.email}}</td>
                </tr>
                <tr>
                    <td class="text-left">Company</td>
                    <td class="text-left">{{userData.company}}</td>
                </tr>
                <tr>
                    <td class="text-left">Password</td>
                    <td class="text-left">{{userData.password}}</td>
                </tr>
                <tr>
                    <td class="text-left">Job Title</td>
                    <td class="text-left">{{userData.jobtitle}}</td>
                </tr>
                <tr>
                    <td class="text-left">Address</td>
                    <td class="text-left">{{userData.address}}</td>
                </tr>
            </tbody>
        </template>
    </v-simple-table>
</div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Userview',
    data() {
        return {
            userId: '',
            userData: {}
        }
    },
    methods: {
        logoutUser() {
            this.$router.push(`/`);
        }
    },
    /* watch:{
        '$route' (to, from) {
            alert(to.params.id);
        }
    },*/
    beforeCreate() {
        //let str = this.$route.params.id;
        let userId = localStorage.getItem('userinfo');
        axios.get(`/api/users`)
            .then((res) => {
                let users = res.data;
                for (let i = 0; i < users.length; i++) {
                    if (userId == users[i].name) {
                        this.userData = users[i];
                    }
                }

            })
    },
}
</script>
