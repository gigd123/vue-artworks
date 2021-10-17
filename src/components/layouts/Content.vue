<template>
    <div class="container pt-5">
        <div class="row g-4">
            <div v-for="item in pageArtWorks" :key="item.id" class="col-12 col-lg-6 col-xl-4">
                <div class="list-card">
                    <div  class="card-pic mb-2" :style="{ backgroundImage: `url(https://www.artic.edu/iiif/2/${item.image_id}/full/843,/0/default.jpg)`}">
                    </div>
                    <hr class="card-hr mb-1">
                    <div class="card-content">
                        <h2 class="mb-3">{{item.title}}</h2>
                        <p></p>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 pt-5 d-flex justify-content-center">
            <div class="pagination d-flex flex-wrap justify-content-center">
                <Pagination :pageLength="artWorksLimit" :currPage="currPage" @goToPageNum="getPageArtWorks" />
            </div>
        </div>
        <div v-if="isLoading" class="loading d-flex align-items-center justify-content-center">
            <img src="../../assets/hourglass.svg" alt="">
        </div>
    </div>
</template>

<script>
import Pagination from '../Pagination.vue'

export default {
    name: 'Content',

    components: {
        Pagination
    },

    data () {
        return {
            artWorks: [],
            pageArtWorks: [],
            artWorksLimit: 0,
            currPage: 1,
            isLoading: false
        }
    },
    
    methods: {
        // async getAllArtWorks () {
        //     const api = `http://localhost:8080/api/v1/artworks`
        //     await this.$axios.get(api).then(res => {
        //         console.log('res', res)
        //         this.artWorks = res.data.data
        //         this.artWorksLimit = Math.ceil(this.artWorks.length / 6)
        //         console.log(this.artWorksLimit)
        //     })
        // },

        async getPageArtWorks (pageNum) {
            try {
                this.isLoading = true
                const api = `http://localhost:8080/api/v1/artworks?page=${pageNum}&limit=12`
                await this.$axios.get(api).then(res => {
                    console.log('res', res)
                    this.pageArtWorks = res.data.data
                    this.currPage = pageNum
                    this.artWorksLimit = res.data.pagination.total_pages
                })
            } catch (err) {
                console.log('err', err)
            } finally {
                this.isLoading = false
            }
        }
    },

    created () {
        // this.getAllArtWorks()
        this.getPageArtWorks(1)
    }
}
</script>

<style lang="scss">
.list-card{
    box-shadow: 4px 4px 8px rgb(202, 202, 202);
    transition: all 0.5s;
    background-color: #fff;
    overflow: hidden;
    height: 350px;
    border-radius: 8px;
    .card-pic{
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        height: 250px;
        width: 100%;
    }
    .card-hr {
        width: 80%;
        margin: 0 auto;
    }
    h2{
        font-size: 1rem;
        color: rgb(19, 173, 109);
        font-weight:900;
        padding: 5px 10px;
    }
    .card-info{
        color: rgb(110, 110, 110);
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        line-height: 1.5;
    }
    p{
        color: rgb(110, 110, 110); 
    }
}
.list-card:hover{
    box-shadow: 4px 4px 30px rgb(141, 141, 141);
}
.loading {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: rgba(131, 131, 131, 0.301);
    backdrop-filter: blur(30px);
    top: 0;
    left: 0;
    img {
        width: 30px;
        animation: fadeIn 1s infinite;
    }
}

@keyframes fadeIn {
  0% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    opacity: 0.2;
  }
}
</style>