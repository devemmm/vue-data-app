<template>
    <main class="form-update">
    <form @submit.prevent="submit">
      <h1 class="h3 mb-3 fw-normal">Update Employee</h1>

      <input
        v-model="id"
        class="form-control"
      />

      <input
        v-model="name"
        class="form-control"
      />

      <input
        v-model="position"
        type="text"
        class="form-control"
      />

      <input
        type="text"
        class="form-control"
        v-model="office"
      />

      <input
        type="number"
        class="form-control"
        v-model="extension"
      />

       <input
        type="datetime"
        class="form-control"
        v-model="startdate"
      />

       <input
        type="number"
        class="form-control"
        v-model="salary"
      />

      <button class="w-100 btn btn-lg btn-primary" type="submit">update</button>
      <p class="mt-5 mb-3 text-muted">&copy; 2021 @devemm</p>
    </form>
  </main>
</template>

<script >
import { ref } from "vue";
import EmployeeData from "../data/EmployeeData.json";

export default {
    name: "Edit",
    data(){
    
        const employee = EmployeeData.filter(emplo => emplo.id == this.$route.params.id)[0]
        const id = ref(employee.id);
        const name = ref(employee.name);
        const position = ref(employee.position);
        const office = ref(employee.office);
        const extension = ref(employee.extension);
        const startdate = ref(employee.startdate);
        const salary = ref(employee.salary); 

        const submit = ()=>{
            console.log(employee)
        }



        return{
            id,
            name,
            position,
            office,
            extension,
            startdate,
            salary,
            submit
        }
  },
  created(){
      console.log(this.$route.params.id)
  }
}
</script>

<style scoped>
html,
body {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-update {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-update .checkbox {
  font-weight: 400;
}

.form-update .form-floating:focus-within {
  z-index: 2;
}

.form-update input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-update input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>