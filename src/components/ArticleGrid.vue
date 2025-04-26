<template>
  <div class="container mx-auto px-2 sm:px-2 lg:px-2">
    <div class="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 mb-10 w-full">
      
      <Loading v-if="isLoading" />

      <a
        v-for="p in post"
        :key="p.id"
        :href="'/article/' + p.slug"
        class="block bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col h-full"
      >
        <!-- Image -->
        <div class="w-full h-48 overflow-hidden">
          <img
            v-if="p.image_url"
            :src="p.image_url"
            alt="Article image"
            class="w-full h-full object-cover"
          />
          <img
            v-else
            :src="`https://picsum.photos/600/400?random=${p.id}`"
            alt="Fallback"
            class="w-full h-full object-cover"
          />
        </div>

        <!-- Card Content -->
        <div class="p-4 flex flex-col justify-between flex-grow">
          <!-- Title -->
          <h5 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-3">
            {{ p.title }}
          </h5>

          <!-- Author + Date -->
          <p class="text-xs italic text-gray-500 dark:text-gray-400 mb-3">
            {{ p.author || 'Unknown Author' }} ·
            <DateUtil :publishedAt="p.created_at" />
          </p>

      <!-- Tags -->
      <div v-if="p.article_tags && p.article_tags.length" class="flex flex-wrap gap-2 mt-auto">
        <span
          v-for="t in p.article_tags.slice(0, 3)"
          :key="t.tag.id"
          class="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full"
        >
          #{{ t.tag.name }}
        </span>
      </div>

        </div>
      </a>
    </div>

    <!-- Load More -->
    <div v-if="!hideLoadMore" class="flex justify-center p-8">
      <button
        @click="loadMore"
        class="btn ml-2 py-2.5 px-6 font-semibold shadow-none p-4"
      >
        LOAD MORE
      </button>
    </div>
  </div>
</template>


  
<script type="module">
import { reactive, computed } from 'vue'
import DateUtil from './DateUtil.vue';
import Loading from './Loading.vue';

const placeholderImage = "https://picsum.photos/600/400";

const placeholderImage1 = "https://fastly.picsum.photos/id/84/1280/848.jpg?hmac=YFRYDI4UsfbeTzI8ZakNOR98wVU7a-9a2tGF542539s"
const placeholderImage2 = "https://fastly.picsum.photos/id/24/4855/1803.jpg?hmac=ICVhP1pUXDLXaTkgwDJinSUS59UWalMxf4SOIWb9Ui4"
import subcategoryMap from '../data/subcategory_map.json'; // adjust path as needed
const getCategoryId = (category, subcategoryMap) => {
  return subcategoryMap[category.toLowerCase()];
};
const headers = { 
    "Content-Type": "application/json", 
    'Cache-Control': 'no-store',
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
            let category = this.category;
            if (category == "tv") {
                category = "tv shows";
            }
            if (category == "socialmedia") {
                category = "social media";
            }
            const limit = 20; 
            const mainCategories = ['breaking','trending','sports','celebrity','entertainment','politics','business'];
            let query;
            let querySubcategory = "https://jisfqytmimlowxlmwebg.supabase.co/rest/v1/articles?select=title,slug,id,image_url,created_at&sub_category=like.*" + category + "*&limit=" + limit + "&order=created_at.desc";
            query = querySubcategory;
            let queryCategory = `https://jisfqytmimlowxlmwebg.supabase.co/rest/v1/articles?select=title,slug,id,image_url,author,created_at,article_tags(tag:tags(*))&category=like.*${category}*&limit=${limit}&order=created_at.desc`;

            if (mainCategories.includes(category)){
                query = queryCategory;
            }  else {
        const subcategoryId = getCategoryId(category, subcategoryMap);
        console.log('Subcategory ID:', subcategoryId)
        console.log(subcategoryId)
        querySubcategory = `https://jisfqytmimlowxlmwebg.supabase.co/rest/v1/articles?select=*,article_subcategories!inner(subcategory_id),article_tags(tag:tags(*))&article_subcategories.subcategory_id=eq.${subcategoryId}&order=created_at.desc&limit=${limit}`;
        query = querySubcategory;

    }
            //console.log('the query is',query);

            fetch(query, { headers, cache: "no-store"})
                .then(response => response.json())
                .then(data => {
                   // console.log('data length',data.length)
                    // 🔁 Flatten if it's a subcategory query
            let normalizedData = data;
            console.log(data)

                this.post = data;

            //console.log('normalized data', normalizedData);

            //this.post = normalizedData;
            this.isLoading = false;


            if (data.length < limit) {
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
            const subcategoryId = getCategoryId(category, subcategoryMap);

            const showMoreLimit = 2;
            const mainCategories = ['breaking','trending','sports','celebrity','entertainment','politics','business'];
            let query;
            let querySubcategory;
            querySubcategory = `https://jisfqytmimlowxlmwebg.supabase.co/rest/v1/articles?select=*,article_subcategories!inner(subcategory_id)&article_subcategories.subcategory_id=eq.${subcategoryId}&order=created_at.desc&limit=${limit}&offset=${offset}`;
            querySubcategory = `https://jisfqytmimlowxlmwebg.supabase.co/rest/v1/articles?select=*,article_subcategories!inner(subcategory_id),article_tags(tag:tags(*))&article_subcategories.subcategory_id=eq.${subcategoryId}&order=created_at.desc&limit=${limit}&offset=${offset}`;
            
            let queryCategory = `https://jisfqytmimlowxlmwebg.supabase.co/rest/v1/articles?select=title,slug,id,image_url,author,created_at,article_tags(tag:tags(*))&category=like.*${category}*&limit=${limit}&offset=${offset}&order=created_at.desc`;

            query = querySubcategory;
            if (mainCategories.includes(category)){
                query = queryCategory;
            } 
            console.log('offset is....',offset);
            // console.log("LOAD MORE");
            // console.log(this.post.length, offset);
            fetch(query, {headers,  cache: "no-store" })
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



