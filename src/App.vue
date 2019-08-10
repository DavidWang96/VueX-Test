<template>
  <div id="app">
    <Input :field-name="'field1'" :sum="true" :helper="{name: 'Миллион', value: 1000000}" ref="field1" @toggle="toggleInput"/>
    <Input :field-name="'field2'" :linked="'field3'" :helper="{name: 'Константа', value: 1000}" ref="field2" @toggle="toggleInput"/>
    <Input :field-name="'field3'" :linked="'field2'" ref="field3" @toggle="toggleInput"/>
  </div>
</template>

<script>
import Input from './components/Input.vue'

export default {
    name: 'app',
    methods: {
        toggleInput(fieldName, side){
            if(side){
                let fieldToTurn = fieldName === 'field1'
                    ? side === 'next' ? 'field2' : 'field3'
                    : fieldName === 'field2'
                        ? side === 'next' ? 'field3' : 'field1'
                        : fieldName === 'field3'
                            ? side === 'next' ? 'field1' : 'field2'
                            : false

                this.$refs[fieldToTurn].inputToggle()
            }
        }
    },
    components: {
        Input
    }
}
</script>

<style lang="scss">
  *{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    outline:none;
    font-size:18px;

    &:hover,
    &:active,
    &:focus{
      outline:none;
    }
  }

  body{
    margin: 10px;
  }

  i.arrow {
    border: solid #4a4a4a;
    border-width: 0px 2px 2px 0;
    display: inline-block;
    margin-top: 7px;
    padding: 2px;
    vertical-align: top;
    &.right {
      transform: rotate(-45deg);
      -webkit-transform: rotate(-45deg);
    }

    &.left {
      transform: rotate(135deg);
      -webkit-transform: rotate(135deg);
    }

    &.up {
      transform: rotate(-135deg);
      -webkit-transform: rotate(-135deg);
    }

    &.down {
      transform: rotate(45deg);
      -webkit-transform: rotate(45deg);
    }
  }
</style>
