<script setup lang="ts">

import { ref, computed } from "vue"

const users = ref([
{ id:1, name:"Ana", email:"ana@mail.com"},
{ id:2, name:"Luis", email:"luis@mail.com"},
{ id:3, name:"Pedro", email:"pedro@mail.com"},
])

const pageSize = ref(10)

const paginatedUsers = computed(()=>{

return users.value.slice(0,pageSize.value)

})

</script>

<template>

<div class="bg-white shadow rounded-xl p-6">

<div class="flex justify-between mb-4">

<h3 class="font-bold">
Users
</h3>

<select v-model="pageSize" class="border p-2 rounded">

<option :value="10">10</option>
<option :value="20">20</option>
<option :value="30">30</option>
<option :value="50">50</option>

</select>

</div>

<table class="w-full">

<thead>

<tr class="text-left border-b">

<th>ID</th>
<th>Name</th>
<th>Email</th>

</tr>

</thead>

<tbody>

<tr
v-for="u in paginatedUsers"
:key="u.id"
class="border-b"
>

<td>{{u.id}}</td>
<td>{{u.name}}</td>
<td>{{u.email}}</td>

</tr>

</tbody>

</table>

</div>

</template>
