<template>
    <div class="container mx-auto">
        <div class="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 mb-10 w-full">

            <Loading v-if="isLoading"/>

            <a class="block mx-auto max-w-sm p-2 sm:border-none bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 min-h-60" :href="'/article/' + p.slug" v-for="p in post" :key="p.id">
                <div class="flex flex-col items-center" > <!-- Use flex and items-center for centering -->
                    <div v-if="p.image_url">
                    <div class="" style="display:flex; justify-content:center;align-items:center; border:1px solid white; background-color:#000; height:164px; width:290px; justify-content">
                    <img class="justify-center" style="max-height:164px; max-wdith:290px;  overflow:hidden" :src=p.image_url />
                    </div>
                    </div>
                    <div v-else>
                    <img class="justify-center" src="https://fastly.picsum.photos/id/84/1280/848.jpg?hmac=YFRYDI4UsfbeTzI8ZakNOR98wVU7a-9a2tGF542539s" width="290" height="364" style="max-height:164px; max-width:290px; overflow:hidden" />
                    </div>
                    <h5 class="mb-2 pt-2 text-l font-semibold tracking-tight text-gray-900 dark:text-white line-clamp-3">{{ p.title }}</h5>
                </div>
                <div class="flex">
                    <div class="flex px-2 py-2 ">
                        <h5 class="text-xs italic tracking-tight text-gray-400 dark:text-white line-clamp-">
                            <span>&#x2013; </span>
                            <DateUtil :publishedAt="p.created_at"></DateUtil>
                        </h5>
                    </div>
                </div>
            </a>

        </div>
        <div v-if="!hideLoadMore" class="flex justify-center p-8" >
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
            hideLoadMore: false,
            loadMoreCounter: 0,
        };
    },
    methods: {
        getPosts() {
            this.isLoading = true;
          //  console.log();
            const category = this.category;
            const limit = 20; 
            const mainCategories = ['breaking','trending','sports','celebrity','entertainment','politics','business'];
            let query;
            const querySubcategory = "https://jisfqytmimlowxlmwebg.supabase.co/rest/v1/articles?select=title,slug,id,image_url,created_at&sub_category=like.*" + category + "*&limit=" + limit + "&order=created_at.desc";
            const queryCategory = "https://jisfqytmimlowxlmwebg.supabase.co/rest/v1/articles?select=title,slug,id,image_url,created_at&category=like.*" + category + "*&limit=" + limit + "&order=created_at.desc";
            query = querySubcategory;
            if (mainCategories.includes(category)){
                query = queryCategory;
            } 
            //console.log('the query is',query);

            fetch(query, { headers, cache: "force-cache"})
                .then(response => response.json())
                .then(data => {
                   // console.log('data length',data.length)
                    this.post = data;
                    this.isLoading = false;
                    if(data.length < limit) {
                        console.log('should hide the button');
                        this.hideLoadMore = true;
                    }
                });
        },
        loadMore() {
            this.isLoading = true;
            const category = this.category;
            let limit = 12;
            let offset = this.post.length;
            const showMoreLimit = 2;
            const mainCategories = ['breaking','trending','sports','celebrity','entertainment','politics','business'];
            let query;
            const querySubcategory = "https://jisfqytmimlowxlmwebg.supabase.co/rest/v1/articles?select=title,slug,id,image_url,created_at&sub_category=like.*" + category + "*&limit=" + limit + "&offset=" + offset + "&order=created_at.desc";
            const queryCategory = "https://jisfqytmimlowxlmwebg.supabase.co/rest/v1/articles?select=title,slug,id,image_url,created_at&category=like.*" + category + "*&limit=" + limit + "&offset=" + offset + "&order=created_at.desc";
            query = querySubcategory;
            if (mainCategories.includes(category)){
                query = queryCategory;
            } 
            console.log('offset is....',offset);
            // console.log("LOAD MORE");
            // console.log(this.post.length, offset);
            fetch(query, {headers,  cache: "force-cache" })
                .then(response => response.json())
                .then(data => {
                    this.post.push(...data);
                    console.log('data length',data.length)
                    console.log('limit',limit)

                    if (data.length < limit){
                        //this.isEndOfArticles == true
                         console.log('limit is', limit)
                         console.log('data lenth', data.length)
                        this.hideLoadMore = true;
                    }
                    if (this.loadMoreCounter >= showMoreLimit){
                        console.log('hide the showmore ');
                        this.hideLoadMore = true;
                    }
                    console.log(this.hideLoadMore)
                    // console.log(this.post);
                    // console.log(data.articles)
                    this.loadMoreCounter++;
                    console.log('Counter',this.loadMoreCounter)

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



