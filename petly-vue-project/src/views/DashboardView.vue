<script setup lang="ts">

import StatsCards from "@/components/dashboard/StatsCards.vue"
import AnimalsChart from "@/components/dashboard/AnimalsChart.vue"
import RatingChart from "@/components/dashboard/RatingChart.vue"
import UsersTable from "@/components/dashboard/UsersTable.vue"
import AnimalsMap from "@/components/dashboard/AnimalsMap.vue"

</script>

<template>

<div class="max-w-7xl mx-auto px-8 py-10">

<h1 class="text-3xl font-bold mb-10">
Admin Dashboard
</h1>

<StatsCards />

<div class="grid grid-cols-2 gap-10 mt-10">

<AnimalsChart />
<RatingChart />

</div>

<div class="mt-10">

<AnimalsMap />

</div>

<div class="mt-10">

<UsersTable />

</div>

</div>

</template>
