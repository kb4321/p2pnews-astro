<template>
    <div class="container mx-auto">

        <!-- <div class="display-column float-left my-10">
            <a href="/news/btc"><button class="btn ml-2 py-2.5 px-5.5 md:px-6 font-semibold shadow-none text-sm float-right mt-4" >Bitcoin</button></a>
            <a href="/news/eth"><button class="btn ml-2 py-2.5 px-5.5 md:px-6 font-semibold shadow-none text-sm float-right mt-4" >Ethereum</button></a>
            <a href="/news/ltc"><button class="btn ml-2 py-2.5 px-5.5 md:px-6 font-semibold shadow-none text-sm float-right mt-4"  >Litecoin</button></a>
            <a href="/news/bnb"><button class="btn ml-2 py-2.5 px-5.5 md:px-6 font-semibold shadow-none text-sm float-right mt-4"  >BNB</button></a>
            <a href="/news/xrp"><button class="btn ml-2 py-2.5 px-5.5 md:px-6 font-semibold shadow-none text-sm float-right mt-4"  >XRP</button></a>
            <a href="/news/ada"><button class="btn ml-2 py-2.5 px-5.5 md:px-6 font-semibold shadow-none text-sm float-right mt-4"  >Cardano</button></a>
            <a href="/news/doge"><button class="btn ml-2 py-2.5 px-5.5 md:px-6 font-semibold shadow-none text-sm float-right mt-4" >DOGE</button></a>
            <a href="/news/xmr"><button class="btn ml-2 py-2.5 px-5.5 md:px-6 font-semibold shadow-none text-sm float-right mt-4">XMR</button></a>
            <a href="/news/trx"><button class="btn ml-2 py-2.5 px-5.5 md:px-6 font-semibold shadow-none text-sm float-right mt-4" >TRX</button></a>
            <a href="/news/alt"><button class="btn ml-2 py-2.5 px-5.5 md:px-6 font-semibold shadow-none text-sm float-right mt-4">ALT</button></a>
        </div> -->

        
        <div class="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 mb-10 w-full">

            <Loading v-if="isLoading"/>

            <a class="block mx-auto max-w-sm p-2 sm:border-none bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 min-h-60"
                :href="'/article/' + p.slug" v-for="p in post" :key="p.id">
                <h5 class="mb-2 text-l font-semibold tracking-tight text-gray-900 dark:text-white line-clamp-3">{{ p.title }}
                </h5>

                <div class="flex">
                    <div class="flex-start py-2" v-if=p.sourceDomain>
                        <img class="rounded-full" :src="'https://logo.clearbit.com/' + p.sourceDomain" height="32" alt="source logo"
                            width="32" />
                    </div>
                    <div class="flex-row px-2 py-3 ">
                        <h5 class="text-sm font-semibold tracking-tight text-gray-900 dark:text-white line-clamp-">{{
                            p.sourceDomain }}
                            <span>&#x2013; </span>
                            <DateUtil :publishedAt="p.publishedAt"></DateUtil>
                        </h5>
                    </div>
                </div>


                <!-- <h5 class="mb-2 mt-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2">
                    <span class="float-left dark:bg-slate-700 bg-slate-100 p-1 rounded-md">{{ p.readingEstimate }}</span>
                    <span class="float-right dark:bg-slate-700 bg-slate-100 p-1 rounded-md">{{ p.score }}/100</span>
                </h5> -->

            </a>

        </div>

    </div>
</template>
  
<script type="module">
import { reactive, computed } from 'vue'
import DateUtil from './DateUtil.vue';
import Loading from './Loading.vue';

const headers = { 
    "Content-Type": "application/json", 
    'apikey':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4aHh0bnJ5ZG9yenR3enlzZHFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODIzOTM4NjIsImV4cCI6MTk5Nzk2OTg2Mn0.y301NUWWQe9RbIjwRZsxI0SB9hrumbzL31NDX12AdLI'};

export default {
    props: {
        category: String,
    },
    data() {
        return {
            post: reactive([]),
            isLoading: false,
        };
    },
    methods: {
        getPosts() {
            this.isLoading = true;
            console.log();
            const category = 'BTC'
            const offset = 0;
            const limit = 28; 

            fetch(`https://zxhxtnrydorztwzysdqj.supabase.co/rest/v1/articles?select=title,slug,id,publishedAt,sourceDomain,sourceName,score,readingEstimate&limit=28&order=publishedAt.desc`, { headers, cache: "force-cache"})
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.post = data;
                    this.isLoading = false;
                });
        },

    },
    mounted() {
        this.getPosts();
    },
    components: { DateUtil, Loading }
}
</script> 



