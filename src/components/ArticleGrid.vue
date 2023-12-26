<template>
    <div class="container mx-auto">


        <div class="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 mt-4 mb-10 w-full">

            <a class="block mx-auto max-w-sm p-2 sm:border-none bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 min-h-60"
                :href="'/article/' + p.sourceDomain+':' + p.slug" v-for="p in post" :key="p.id">
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
            <Loading v-if="isLoading"></Loading>

        </div>

        
      
        <div class="flex justify-center" >

            <button @click="loadMore"  class="btn ml-2 py-2.5 px-5.5 md:px-6 font-semibold shadow-none  p-4">
                LOAD MORE
            </button>
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
            hideLoadMore: false,
        };
    },
    methods: {
        getPosts() {
            this.isLoading = true;
            console.log();
            const category = this.category.toUpperCase();
            const offset = 0;
            const limit = 16; 
            // fetch(`https://factual-vulture-98.hasura.app/api/rest/articlesclo?limit=${limit}&offset=0&category=${category}`, { headers ,  cache: "force-cache" })
            // https://zxhxtnrydorztwzysdqj.supabase.co/rest/v1/articles?select=*&category=in.(POLY)
            // https://zxhxtnrydorztwzysdqj.supabase.co/rest/v1/articles?select=*&category=like.*POLY*
            // const tardurl = `https://zxhxtnrydorztwzysdqj.supabase.co/rest/v1/articles?select=*&category=like.*${category}* &limit=${limit}`
            // console.log(tardurl)

            fetch(`https://zxhxtnrydorztwzysdqj.supabase.co/rest/v1/articles?select=id,title,slug,id,publishedAt,sourceDomain,sourceName,score,description,readingEstimate&category=like.*${category}*&limit=${limit}&order=publishedAt.desc`, { headers, cache: "no-cache"})
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    if (data.length < 15)
                        this.hideLoadMore = true
                      
                    console.log(this.hideLoadMore)
                    // this.post = data.articles
                    this.post = data;
                    console.log(this.post)
                    this.isLoading = false;
                });
        },
        loadMore() {
            this.isLoading = true;
            const category = this.category.toUpperCase();
            const limit = 16;
            const offset = this.post.length + limit;
            // console.log(offset);
            // console.log("LOAD MORE");
            // console.log(this.post.length, offset);
            fetch(`https://zxhxtnrydorztwzysdqj.supabase.co/rest/v1/articles?select=*&category=like.*${category}*&limit=${limit}&offset=${offset}&order=publishedAt.desc`, {headers,  cache: "force-cache" })
                .then(response => response.json())
                .then(data => {
                    this.post.push(...data);
                    console.log(data.length)
                    if (data.length < limit)
                        this.isEndOfArticles == true
                    
                    console.log(this.isEndOfArticles)
                    // console.log(this.post);
                    // console.log(data.articles)
                    this.isLoading = false;
                });
        }
    },
    mounted() {
        this.getPosts();
    },
    components: { DateUtil, Loading }
}
</script> 



