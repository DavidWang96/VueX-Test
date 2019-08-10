<template>
  <div :class="['integer-field', {'open' : inputOpen}]" @click="inputToggle" ref="inputBlock"
       v-closable="{
          exclude: ['inputBlock'],
          handler: 'inputClose'
       }">
    <input @keydown="handleKeyPress"
            :name="fieldName"
            v-show="inputOpen"
            type="number"
            class="integer-field__input"
            v-model.number="localValue"
            ref="field">

    <span v-show="!inputOpen" class="integer-field__value">{{ inputValue.toLocaleString('ru') }}</span>
    <i v-show="!inputOpen" class="arrow down"></i>
    <div v-show="inputOpen" class="integer-field__incr-decr">
      <div class="increment" @click="setValue(localValue + 1)">
        <i class="arrow up"></i>
      </div>
      <div class="dicrement" @click="localValue > 0 ? setValue(localValue - 1) : false">
        <i class="arrow down"></i>
      </div>
    </div>
    <div v-if="helper || sum" class="integer-field__additions">
      <span v-show="helper && inputOpen" @click="setValue(helper.value)">{{helper.name}}</span>
      <span v-show="sum && inputOpen" @click="setValue(fieldsSum)">Сумма</span>
    </div>
  </div>
</template>

<script>

import {mapGetters} from 'vuex'
import {mapActions} from 'vuex'
export default {
    data(){
        return {
            inputOpen: false,
            localValue: 0
        }
    },
    props: ['fieldName', 'helper', 'sum', 'linked'],
    methods: {
        ...mapActions(['setField']),
        inputToggle(){
            this.inputOpen = true
            this.$nextTick(() => {
                this.$refs.field.focus()
                this.$refs.field.select()
            })

        },
        inputClose () {
            if(this.inputOpen === true) {
                this.inputOpen = false
                this.$refs.field.blur()
                this.handleChange()
            }
        },
        handleChange(){
            Number.isInteger(this.localValue) && this.localValue >=0
                ? this.setField({fieldName: this.fieldName, value: this.localValue})
                : Number.isInteger(this.localValue)
                    ? (() => {
                      this.localValue = 0
                      this.setField({fieldName: this.fieldName, value: 0})
                    })()
                    : this.localValue = this.inputValue
        },
        handleKeyPress(e){
            return e.keyCode === 13
                ? this.inputClose()
                : e.keyCode === 27
                    ? (() => {
                        this.localValue = this.inputValue
                        this.inputClose()
                    })()
                    : !e.shiftKey && e.keyCode === 9
                        ? (() => {
                            e.preventDefault()
                            this.inputClose()
                            this.$emit('toggle', this.fieldName, 'next')
                        })()
                        : e.shiftKey && e.keyCode === 9
                            ? (() => {
                                e.preventDefault()
                                this.inputClose()
                                this.$emit('toggle', this.fieldName, 'back')
                            })()
                            : false
        },
        setValue(value){
            if(value < 0) return this.localValue = 0

            this.localValue = value
            this.setField({fieldName: this.fieldName, value: this.localValue})
        },
    },
    watch: {
        localValue(){
            if(this.linked){
                this.setField({fieldName: this.linked, value: this.localValue})
            }
        },
        inputValue(){
            this.localValue = this.getFields[this.fieldName]
        }
    },
    computed: {
        ...mapGetters(['getFields', 'fieldsSum']),
        inputValue(){
            return this.getFields[this.fieldName]
        }
    },
    mounted(){
        this.localValue = this.inputValue
    },
}
</script>

<style lang="scss" scoped>
  .integer-field {
    cursor:pointer;
    position:relative;
    max-width:400px;
    padding:5px;
    margin-bottom:18px;

    *{
      position:relative;
      z-index:-1;
    }

    input{
      padding:5px;
      width: 100%;
      border:1px solid transparent;
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }

    &__value{
      margin-right: 10px;
    }

    &.open{
      padding:0;

      *{
        position:static;
        z-index:auto;
      }

      input{
        background-color: #f6f6f6;
        border-color: #b7b7b7;
      }

      .integer-field__incr-decr,
      .integer-field__additions{
        position:absolute;
      }

    }

    &__incr-decr{
      right:20px;
      top:3px;
      bottom:0;
      .increment,
      .dicrement{
        position:absolute;
        height: 15px;
        width: 15px;
        cursor:pointer;
        &:hover{
          i{
            border-color: #0000a6;
          }
        }
        .arrow{
          margin-top: 3px;
          margin-left: 4px;
        }
      }
      .increment{
        top:2px;
      }
      .dicrement{
        bottom:2px;
      }
    }

    &__additions{
      bottom: -15px;
      span{
        font-size:12px;
        color: #36b5ff;
        margin-left: 10px;
      }
    }

    &:hover{
      > .integer-field__value{
        color: #0000a6;
      }
      > .arrow{
        border-color: #0000a6;
      }
    }
  }
</style>