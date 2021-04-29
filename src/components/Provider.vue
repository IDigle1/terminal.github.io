<template>
    <v-container v-if="provider.name">
        <v-row>
            <v-col cols="12">
                <h2>{{ provider.name }}</h2>
            </v-col>
            <v-col cols="12">
                <form @submit.prevent="refillBalance(provider.code)">
                    <div class="form-group mb-5">
                            <the-mask 
                                class="form-input"
                                :class="{'has-error': $v.phoneNumber.$error}"
                                v-model="$v.phoneNumber.$model" 
                                mask="+7 (###) ### ##-##"
                                :masked="true"
                                placeholder="Телефон"
                            />

                            <div v-if="$v.phoneNumber.$error">
                                <div class="input-error" v-if="!$v.phoneNumber.required">Введите телефон</div>
                                <div class="input-error" v-if="!$v.phoneNumber.phoneNumber">Неправильно введен телефон</div>
                            </div>
                    </div>

                    <div class="form-group mb-5">
                        <input 
                            class="form-input"
                            :class="{'has-error': $v.amount.$error}"
                            v-model="$v.amount.$model" 
                            placeholder="Сумма"
                        />

                        <div v-if="$v.amount.$error">
                            <div class="input-error" v-if="!$v.amount.required">Введите сумму</div>
                            <div class="input-error" v-if="!$v.amount.numeric">
                                Поле должно содержать только цифры
                            </div>
                            <div class="input-error" v-if="!$v.amount.between">
                                Сумма должна быть не менее {{ $v.amount.$params.between.min }} и не более {{ $v.amount.$params.between.max }}
                            </div>
                        </div>
                    </div>

                    <div class="form-goup d-flex justify-end">
                        <v-btn 
                            type="submit"
                            :loading="getSubmitStatus == 'pending'"
                            :disabled="getSubmitStatus == 'ok'"
                        >
                            Submit
                        </v-btn>
                    </div>

                    <div v-if="getSubmitStatus === 'ok'">Счет успешно пополнен!</div>
                    <div v-if="getSubmitStatus === 'error'">Произошла ошибка, попробуйте позже.</div>
                    <div v-if="getSubmitStatus === 'invalid'">Заполните форму правильно.</div>
                </form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { TheMask } from 'vue-the-mask';
import { required, between, numeric, helpers } from 'vuelidate/lib/validators'
import { SET_CURRENT_PROVIDER, SET_SUBMIT_STATUS } from '../store/types/mutations.types';

const phonePattern = /^(\+7)\s(\([0-9]{3}\))\s([0-9]{3})\s([0-9]{2})-([0-9]{2})$/;
const phoneNumber = helpers.regex('phoneNumber', phonePattern);

export default {
    name: 'Provider',
    components: {
        TheMask
    },
    props: {
        provider: Object
    },
    data() {
        return {
            phoneNumber: '',
            amount: '',
            status: null
        }
    },
    validations: {
        phoneNumber: {
            required,
            phoneNumber,
        },
        amount: {
            required,
            numeric,
            between: between(1, 1000)
        }
    },
    methods: {
        setSubmitStatus(status) {
            this.$store.commit(SET_SUBMIT_STATUS, status)
        },

        resetCurrentProvider() {
            this.$store.commit(SET_CURRENT_PROVIDER, {})
        },

        refillBalance(code) {
            this.$v.$touch();

            if (this.$v.$invalid) {
                this.setSubmitStatus('invalid');
            } else {
                this.$store.dispatch('refillBalance', {
                    providerCode: code,
                    phoneNumber: this.phoneNumber,
                    amount: this.amount
                });
            }
        }
    },
    computed: {
        getResponse() {
            return this.$store.state.response;
        },

        getSubmitStatus() {
            return this.$store.getters.getSubmitStatus;
        },
    },

    watch: {
        getSubmitStatus(val) {
            if (val === 'ok') {
                setTimeout(() => {
                    this.$router.push('/');
                }, 2000)
            }
        }
    },

    beforeDestroy() {
        this.setSubmitStatus(null);
        this.resetCurrentProvider();
    }
}
</script>

<style scoped>
.input-error {
    padding-top: 5px;
    font-size: 12px;
    color: red;
}

.form-input {
    border-bottom: 1px solid #d1d1d1;
    border-radius: 3px;
    padding: 5px 0;
    display: block;
    width: 100%;
    outline: none;
}

.form-input.has-error {
    border-color: #f00;
}
</style>