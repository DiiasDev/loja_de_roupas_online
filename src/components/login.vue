<template>
    <v-row>
        <v-col>
            <v-sheet class="d-flex align-center justify-center" height="100vh">
                <v-card width="30%">
                    <v-card-title class="text-h5 text-center">
                        Login
                    </v-card-title>
                    <v-card-text>
                        <v-form>
                            <v-text-field label="Email" type="email" required></v-text-field>
                            <v-text-field label="Senha" type="password" required></v-text-field>
                            <v-btn color="primary" class="mt-4">Entrar</v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-sheet>
        </v-col>
    </v-row>
</template>

<script>
export default{
    name: 'LoginVue',
    data(){
        return{

        }
    }
}
</script>