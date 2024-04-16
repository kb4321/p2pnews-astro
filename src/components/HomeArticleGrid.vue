<template>
    <div class="container mx-auto">
        <div class="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 mb-10 w-full">

            <Loading v-if="isLoading"/>

            <a class="block mx-auto max-w-sm p-2 sm:border-none bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 min-h-60" :href="'/article/' + p.slug" v-for="p in post" :key="p.id">
                <div class="flex flex-col items-center"> <!-- Use flex and items-center for centering -->
                    <div v-if="p.image_url">
                    <img class="justify-center" style="max-height:194px; overflow:hidden" :src=p.image_url />
                    </div>
                    <div v-else>
                    <img class="justify-center" src="https://fastly.picsum.photos/id/84/1280/848.jpg?hmac=YFRYDI4UsfbeTzI8ZakNOR98wVU7a-9a2tGF542539s" width="320" height="180" />
                    </div>
                    <h5 class="mb-2 text-l font-semibold tracking-tight text-gray-900 dark:text-white line-clamp-3">{{ p.title }}</h5>
                </div>
                <div class="flex">
                    <div class="flex-row px-2 py-3 ">
                        <h5 class="text-sm font-semibold tracking-tight text-gray-400 dark:text-white line-clamp-">
                            <span>&#x2013; </span>
                            <DateUtil :publishedAt="p.created_at"></DateUtil>
                        </h5>
                    </div>
                </div>
            </a>

        </div>

    </div>
</template>
  
<script type="module">
import { reactive, computed } from 'vue'
import DateUtil from './DateUtil.vue';
import Loading from './Loading.vue';
const placeholderImage = "https://fastly.picsum.photos/id/84/1280/848.jpg?hmac=YFRYDI4UsfbeTzI8ZakNOR98wVU7a-9a2tGF542539s"
const placeholderImage2 = "https://fastly.picsum.photos/id/24/4855/1803.jpg?hmac=ICVhP1pUXDLXaTkgwDJinSUS59UWalMxf4SOIWb9Ui4"

const headers = { 
    "Content-Type": "application/json", 
    'apikey':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imppc2ZxeXRtaW1sb3d4bG13ZWJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU1NjM4MjAsImV4cCI6MjAwMTEzOTgyMH0.mY3oqMAJDu9Fc9OrzIzhZQkILHxP9lc_lUnf-Q8Jh6s'};

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

            fetch(`https://jisfqytmimlowxlmwebg.supabase.co/rest/v1/articles?select=title,slug,id,image_url,created_at&limit=28&order=created_at.desc`, { headers, cache: "force-cache"})
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



