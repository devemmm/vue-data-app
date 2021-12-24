<template>
<main class="form-update">
   <div class="between:flex bottom:margin-3">
    <div class="center:flex-items">
      <span class="right:margin-2">Show</span>
      <select v-model="currentEntries" class="select" @change="paginateEntries">
        <option v-for="se in showEntries" :key="se" :value="se">
          {{ se }}
        </option>
      </select>
      <span class="left:margin-1">entries</span>
    </div>
    <div class="end:flex">
      <input
        type="search"
        class="input px.width-25"
        placeholder="Search here.."
        v-model="searchInput"
        @keyup="searchEvent"
      />
    </div>
  </div>
  <table class="table table:border secondary-5:border">
    <thead>
      <tr>
        <th v-for="th in tableHeader" :key="th">
          <div class="between:flex center:items">
            <span>{{ th.text }}</span>
            <span @click.prevent="soltByColumn(th.name)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-filter none:event"
                viewBox="0 0 16 16"
              >
                <path
                  d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"
                />
              </svg>
            </span>
          </div>
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="td in tableData" :key="td">
        <td>{{ td.id }}</td>
        <td>{{ td.name }}</td>
        <td>{{ td.position }}</td>
        <td>{{ td.office }}</td>
        <td>{{ td.extension }}</td>
        <td>{{ td.startdate }}</td>
        <td>{{ td.salary }}</td>
        <td><button> <router-link :to="`/update/${td.id}`" active-class="active" class="nav-link">Edit</router-link></button></td>
      </tr>
    </tbody>
  </table>

  <div class="between:flex y:margin-3">
    <div>
      Show {{ showInfo.from }} to {{ showInfo.to }} of {{ showInfo.of }} entries
    </div>
    <div class="end:flex">
      <ul class="pagination:nav">
        <li :class="['nav-item', { disabled: currentPage === 1 }]">
          <a
            href="#"
            class="nav-link"
            @click.prevent="(currentPage = 1), paginateEntries()"
            >First</a
          >
        </li>
        <li :class="['nav-item', { disabled: currentPage === 1 }]">
          <a
            href="#"
            class="nav-link"
            @click.prevent="
              currentPage < 1 ? (currentPage = 1) : (currentPage -= 1),
                paginateEntries()
            "
            >Prev</a
          >
        </li>
        <li
          v-for="pagi in showPagination" :key="pagi" class=" ['nav-item',{'ellipsis': pagi === '...', 'active': pagi === currentPage}]">
          <a href="#" class="nav-link" @click.prevent="paginateEvent(pagi)">{{ pagi }}</a>
        </li>
        <li :class="['nav-item', { disabled: currentPage === allpage }]">
          <a
            href="#"
            class="nav-link"
            @click.prevent="
              currentPage > allpage
                ? (currentPage = allpage)
                : (currentPage += 1),
                paginateEntries()
            "
            >Prev</a
          >
        </li>
        <li :class="['nav-item', { disabled: currentPage === allpage }]">
          <a
            href="#"
            class="nav-link"
            @click.prevent="(currentPage = allpage), paginateEntries()"
            >Last</a
          >
        </li>
      </ul>
    </div>
  </div>
  </main>
</template>

<script>
import { computed } from "vue";
import * as $ from "alga-js";
import EmployeeData from "../data/EmployeeData.json";


export default {
    name: "DataView",
    data(){
    return {
      columns: [
        { name: "id", text: "ID" },
        { name: "name", text: "NAME" },
        { name: "position", text: "POSITION" },
        { name: "office", text: "OFFICE" },
        { name: "extension", text: "EXTENSION" },
        { name: "startdate", text: "STARTDATE" },
        { name: "salary", text: "SALARY" },
        { name: "edit", text: "EDIT" },
      ],
      entries: [],
      showEntries: [5, 10, 15, 25, 50, 72, 100],
      currentEntries: 5,
      filteredEntries: [],
      currentPage: 1,
      allpage: 1,
      searchInput: "",
      searchEntries: [],
      employees: EmployeeData,
      col: {
        name: '',
        position: '',
        office: '',
        extension: '',
        startdate: '',
        salary: ''
      },
      soltcol: {
        name: '',
        position: '',
        office: '',
        extension: '',
        startdate: '',
        salary: ''
      }
    };
  },
  provide() {
    return {
      raw: computed(() => this.getCurrentEntries()),
    };
  },
  computed: {
    showInfo() {
      const getCurrentEntries = this.getCurrentEntries();
      return $.array.show(
        getCurrentEntries,
        this.currentPage,
        this.currentEntries
      );
    },
    showPagination() {
      return $.array.pagination(this.allpage, this.currentPage, 3);
    },
    tableHeader() {
      return this.columns
    },
    tableData() {
      return this.filteredEntries
    }
  },
  created() {
    this.entries = this.employees;
    this.paginateData(this.entries);
  },
  methods: {
    paginateEntries() {
      if (this.searchInput.length >= 3) {
        this.searchEntries = $.array.search(this.entries, this.searchInput);
        this.paginateData(this.searchEntries);
      } else {
        this.searchEntries = [];
        this.paginateData(this.entries);
        this.col = {
          name: '',
          position: '',
          office: '',
          extension: '',
          startdate: '',
          salary: ''
        }
      }
    },
    paginateEvent(page) {
      this.currentPage = page;
      this.paginateEntries();
    },
    searchEvent() {
      this.currentPage = 1;
      this.paginateEntries();
    },
    paginateData(data) {
      this.filteredEntries = $.array.paginate(
        data,
        this.currentPage,
        this.currentEntries
      );
      this.allpage = $.array.pages(data, this.currentEntries);
    },
    getCurrentEntries() {
      return this.searchEntries.length <= 0 ? this.entries : this.searchEntries;
    },
    uniqColumnData(column){
      return $.array.unique(this.getCurrentEntries(), column)
    },
    filterByColumn(){
      
      const filterCol = $.object.removeBy(this.col, '')
      let filterData = this.getCurrentEntries();

      if(Object.entries(filterCol).length >= 1){
        // console.log(Object.keys(filterCol))
        filterData = $.array.filtered(this.getCurrentEntries(), ...Object.values(filterCol), Object.keys(filterCol));
      }

      console.log(filterData);
      this.paginateData(filterData);
    },
    soltByColumn(column){
      this.col = {
        name: '',
        position: '',
        office: '',
        extension: '',
        startdate: '',
        salary: ''
      }

      let sortedEntries = this.getCurrentEntries();
      let soltedColumn = this.soltcol[column]

      if(soltedColumn === ''){
        this.soltcol[column] = 'asc'
        sortedEntries = $.array.sorted(this.getCurrentEntries(), column, 'asc')
      }else if(soltedColumn === 'asc'){
        this.soltcol[column] = 'desc'
        sortedEntries = $.array.sorted(this.getCurrentEntries(), column, 'desc')
      }else if(soltedColumn === 'desc'){
        this.soltcol[column] = ''
      }
      this.paginateData(sortedEntries)
    }
  },
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
  max-width: 90%;
  padding: 15px;
  margin: auto;
}
</style>