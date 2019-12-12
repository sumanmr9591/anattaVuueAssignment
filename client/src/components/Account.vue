<style>
#account-container {
    color: #ffffff;
    text-align: left;
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

.table-row {
    background: #2d333a;
    color: #c9cccd;
}

.table-row:hover {
    color: #2d333a;
}

.buttonCus {
    cursor: pointer !important;
}

.buttonDel {
    color: #ffffff !important;
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
.v-data-table__wrapper{
  margin-top:15px;
}

#logout{
    float: right;
}
</style>
<template>
<div id="account-container">
    <div id="bar">
        <v-btn @click="logoutUser" id="logout" color="primary">Logout</v-btn>
    </div>
    <v-dialog v-model="deleteDialog" width="500">

        <v-card>
            <v-card-title class="cardHead" primary-title>
                Delete User {{this.currentUser.name}}
            </v-card-title>

            <v-card-text>
                <p id="deleteText">Are you sure you want delete {{this.currentUser.name}}'s detail?</p>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-btn color="primary" @click="deleteDialog = false">Cancel</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="confirmedDelete">
                    Delete
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-dialog v-model="editDialog" width="600">

        <v-card>
            <v-card-title class="cardHead" primary-title>
                Edit User {{this.currentUser.name}}
            </v-card-title>

            <v-card-text>
                <v-form>
                    <v-text-field v-model="currentUser.name" label="Username" prepend-icon="mdi-account-circle" />
                    <v-text-field v-model="currentUser.email" label="Email" type="email" prepend-icon="mdi-email" />
                    <v-text-field v-model="currentUser.company" label="Company" prepend-icon="mdi-bank" />
                    <v-text-field v-model="currentUser.password" label="Create Password" :type="showCreatePassword ? 'text' : 'password'" prepend-icon="mdi-lock" :append-icon="showCreatePassword ? 'mdi-eye': 'mdi-eye-off'" @click:append="showCreatePassword= !showCreatePassword" />
                    <v-text-field v-model="currentUser.cpassword" label="Confirm Password" :type="showConfirmPassword ? 'text' : 'password'" prepend-icon="mdi-lock" :append-icon="showConfirmPassword ? 'mdi-eye': 'mdi-eye-off'" @click:append="showConfirmPassword= !showConfirmPassword" />
                    <v-text-field v-model="currentUser.jobtitle" label="Job Title" prepend-icon="mdi-account-tie-outline" />
                    <v-text-field v-model="currentUser.address" label="Address" prepend-icon="mdi-map-marker-outline" />
                </v-form>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-btn color="primary" @click="editDialog = false">Cancel</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="updateUser">
                    Update
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <h2>Manage User's Info</h2>
    <!--<p>{{$route.params.id}}</p>-->
    <v-simple-table>
        <template v-slot:default>
            <thead>
                <tr>
                    <th class="text-left">Name</th>
                    <th class="text-left">Email</th>
                    <th class="text-left">Company</th>
                    <th class="text-left">Job Title</th>
                    <th class="text-left">Address</th>
                    <th class="text-left">Password</th>
                    <th class="text-left">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr class="table-row" v-for="user in users" :key="user._id">
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.company }}</td>
                    <td>{{ user.jobtitle }}</td>
                    <td>{{ user.address }}</td>
                    <td>{{ user.password }}</td>
                    <td>
                        <v-btn class="buttonCus" @click="editUser(user)" color="primary">EDIT</v-btn>   <v-btn class="buttonDel" color="#E53935" @click="deleteUser(user)">DELETE</v-btn>
                       
                    </td>
                </tr>
            </tbody>
        </template>
    </v-simple-table>
</div>
</template>

<script>
import axios from "axios";
export default {
    name: 'Account',
    watch: {
        //'$route' (to, from) {
        //    alert(to.params.id);
        //}
    },
    beforeCreate() {
        axios.get('/api/users')
            .then((res) => {
                this.users = res.data;
            });
    },

    data() {
        return {
            users: [],
            deleteDialog: false,
            editDialog: false,
            currentUser: {},
            showCreatePassword: false,
            showConfirmPassword: false
        }
    },
    methods: {
        logoutUser() {
            this.$router.push(`/`);
        },
        editUser(user) {
            this.currentUser = user;
            this.editDialog = true;
        },
        deleteUser(user) {
            this.currentUser = user;
            this.deleteDialog = true;
        },
        updateUser() {
            let user = {
                name: this.currentUser.name,
                email: this.currentUser.email,
                company: this.currentUser.company,
                password: this.currentUser.password,
                cpassword: this.currentUser.password,
                jobtitle: this.currentUser.jobtitle,
                address: this.currentUser.address
            }
            axios.put(`/api/user/${this.currentUser._id}`, user)
                .then(() => {
                    axios.get('/api/users')
                        .then((res) => {
                            this.users = res.data;
                            this.editDialog = false;
                        });
                });
        },
        confirmedDelete() {
            axios.delete(`/api/user/${this.currentUser._id}`)
                .then(() => {
                    for (let i = 0; i < this.users.length; i++) {
                        if (this.currentUser._id === this.users[i]._id) {
                            this.users.splice(i, 1);
                            this.deleteDialog = false;
                        }
                    }
                });
        }
    }
}
</script>
