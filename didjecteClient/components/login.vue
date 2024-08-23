<template>
  <div>
    <div class="flex">
      <Button rounded label="Sign in" class="!py-1 !shadow-none mr-1 border-2" @click="signInDialog = true"></Button>
      <Button rounded label="Sign up" class="!py-1 !shadow-none border-2" outlined></Button>
    </div>
    <Dialog 
      v-model:visible="signInDialog" 
      modal 
      dismissableMask
      :draggable="false"
      header="SIGN IN" 
      :pt="{
        headerTitle: {
          class: 'font-bold text-lg flex-grow text-center'
        },
        content: {
        }
      }">
      <div class="pt-1 flex flex-col items-center w-full">
        <div class="w-2/3 pb-6">
          <span class="p-float-label">
            <label for="username">Username / Email</label>
            <InputText id="username" v-model="username" type="text" class="w-full"/>
          </span>
        </div>
        <div class="w-2/3">
          <span class="p-float-label">
            <label for="username">Password</label>
            <InputText id="username" v-model="password" type="text" class="w-full"/>
          </span>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {  
        signInDialog: false,
        signUpDialog: false,
        username: '',
        password: ''
      }
    }
  }
</script>