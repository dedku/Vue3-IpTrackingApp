<template>
    <div class="flex flex-col h-screen max-h-screen ">
        <div class="z-20 flex justify-center relative bg-hero-pattern bg-cover px-4 pt-8 pb-32">
            <div class="w-full max-w-screen-sm">
                <h1 class="text-white text-center text-3xl pb-4">IP Address Tracker</h1>
                <div class="flex">
                    <input class="flex-1 py-3 px-2 rounded-tl-md rounded-bl-md focus:outline-none" type="text"
                        placeholder="Search for any IP address or leave empty to get your ip info">
                    <i
                        class="cursor-pointer bg-black text-white px-4  rounded-tr-md rounded-br-md flex items-center fas fa-chevron-right"></i>
                </div>
            </div>
            <IPInfo />
        </div>
        <div id="mapid" class="h-full z-10"></div>
    </div>

</template>

<script lang="ts">
import { onMounted } from 'vue';
import * as L from 'leaflet'
import IPInfo from '../components/IPInfo.vue'
export default {
    name: 'Home',
    components: { IPInfo },
    setup() {
        let mymap: any

        onMounted(() => {
            mymap = L.map('mapid').setView([51.505, -0.09], 13);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(mymap);
        })
    }
}
</script>
