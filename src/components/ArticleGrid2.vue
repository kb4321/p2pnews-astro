<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">Daily Articles</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <div
        v-for="article in articles"
        :key="article.id"
        class="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow duration-200 overflow-hidden"
      >
        <img
          v-if="article.image"
          :src="article.image"
          :alt="article.title"
          class="w-full h-48 object-cover"
        />

        <div class="p-5">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {{ article.title }}
          </h2>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
            {{ article.date }} · {{ article.author }}
          </p>

          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in article.tags"
              :key="tag"
              class="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full"
            >
              #{{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const articles = [
  {
    id: 1,
    title: "Your First Article",
    date: "April 21, 2025",
    author: "Jane Doe",
    image: "https://picsum.photos/seed/article1/400/300",
    tags: ["vue", "graphql", "tailwind"],
  },
  {
    id: 2,
    title: "Exploring Vue 4",
    date: "April 22, 2025",
    author: "John Smith",
    image: "https://picsum.photos/seed/article1/400/300",
    tags: ["vue", "composition-api", "javascript"],
  },
  {
    id: 3,
    title: "Styling with Tailwind CSS",
    date: "April 23, 2025",
    author: "Alice Johnson",
    image: "https://picsum.photos/seed/article1/400/300",
    tags: ["css", "tailwind", "frontend"],
  },
];
</script>
  
<script type="module">
import { reactive, computed } from 'vue'
import DateUtil from './DateUtil.vue';
import Loading from './Loading.vue';
const placeholderImage = "https://fastly.picsum.photos/id/84/1280/848.jpg?hmac=YFRYDI4UsfbeTzI8ZakNOR98wVU7a-9a2tGF542539s"
const placeholderImage2 = "https://fastly.picsum.photos/id/24/4855/1803.jpg?hmac=ICVhP1pUXDLXaTkgwDJinSUS59UWalMxf4SOIWb9Ui4"
import subcategoryMap from '../data/subcategory_map.json'; // adjust path as needed
const getCategoryId = (category, subcategoryMap) => {
  return subcategoryMap[category.toLowerCase()];
};
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
            const queryCategory = "https://jisfqytmimlowxlmwebg.supabase.co/rest/v1/articles?select=title,slug,id,image_url,created_at&category=like.*" + category + "*&limit=" + limit + "&order=created_at.desc";
            query = querySubcategory;
            
            if (mainCategories.includes(category)){
                query = queryCategory;
            }  else {
        const subcategoryId = getCategoryId(category, subcategoryMap);
        console.log('Subcategory ID:', subcategoryId)
        console.log(subcategoryId)
        //querySubcategory = `https://jisfqytmimlowxlmwebg.supabase.co/rest/v1/article_subcategories?select=article:articles(title,slug,id,image_url,created_at)&subcategory_id=eq.${subcategoryId}&limit=${limit}`;
        querySubcategory = `https://jisfqytmimlowxlmwebg.supabase.co/rest/v1/articles?select=*,article_subcategories!inner(subcategory_id)&article_subcategories.subcategory_id=eq.${subcategoryId}&order=created_at.desc&limit=${limit}`;
        query = querySubcategory;

    }
            //console.log('the query is',query);

            fetch(query, { headers, cache: "force-cache"})
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



