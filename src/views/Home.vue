<template>
    <div class="flex flex-col h-screen max-h-screen ">
        <div class="z-20 flex justify-center relative bg-hero-pattern bg-cover px-4 pt-8 pb-32">
            <div class="w-full max-w-screen-sm">
                <h1 class="text-white text-center text-3xl pb-4">IP Address Tracker</h1>
                <div class="flex">
                    <input class="flex-1 py-3 px-2 rounded-tl-md rounded-bl-md focus:outline-none" type="text"
                        placeholder="Search for any IP address or leave empty to get your ip info" v-model="queryIp">
                    <i class="cursor-pointer bg-black text-white px-4  rounded-tr-md rounded-br-md flex items-center fas fa-chevron-right"
                        @click="getIpInfo" />
                </div>
            </div>
            <IPInfo v-if="ipInfo" v-bind:ipInfo="ipInfo" />
        </div>
        <div id="mapid" class="h-full z-10"></div>
    </div>

</template>

<script lang="ts">
import { onMounted, ref } from 'vue';
import * as leaflet from 'leaflet'
import IPInfo from '../components/IPInfo.vue'
import axios from 'axios'
import IpInfo from '../types';
export default {
    name: 'Home',
    components: { IPInfo },
    setup() {
        let mymap: any

        const queryIp = ref('')
        const ipInfo = ref<IpInfo | null>(null)

        onMounted(() => {
            mymap = leaflet.map('mapid').setView([51.505, -0.09], 13);
            leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(mymap);
        })

        const getIpInfo = async () => {
            try {
                const data = await axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=at_8TJOdKP6SOm3GtROpWSaBIVUmwNXF&ipAddress=${queryIp.value}
                `)
                const result = data.data
                ipInfo.value = {
                    address: result.ip,
                    state: result.location.country,
                    timezone: result.location.timezone,
                    isp: result.isp,
                    lat: result.location.lat,
                    lng: result.location.lng
                }

                leaflet.marker([ipInfo.value.lat, ipInfo.value.lng]).addTo(mymap);
                mymap.setView([ipInfo.value.lat, ipInfo.value.lng, 10]);
            } catch (err: any) {
                alert(err.message)
            }
        }

        return { queryIp, ipInfo, getIpInfo }
    }
}
</script>
