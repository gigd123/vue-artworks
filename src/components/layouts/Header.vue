<template>
    <header class="container-fulid">
        <nav class="navbar container">
            <div class="row w-100">
                <div class="logo-box col-md-4">
                    <a class="navbar-brand">
                        <img class="logo" src="https://hexschool.github.io/THE_F2E_Design/week2-filter/assets/logo.svg" alt="">
                    </a>
                </div>
                <div class="input-box col-12 col-md-6 p-1">
                    <span class="searchIcon">
                        <i class="fas fa-search fa-lg"></i>
                    </span>
                    <input id="search-input" type="search" name="" placeholder="Explore your own activities">
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
export default {
    name: 'Header'
}
</script>

<style lang="scss">

header{
    background-color: rgb(93, 204, 158);
    .navbar {
        padding: 1.5rem;
    }
    .input-box{
        border-bottom: 1px solid #fff;
    }
    .searchIcon{
        color: #fff;
    }
    #search-input{
        background-color: rgba(242, 242, 242, 0);
        border: none;
        font-size: 1.25rem;
        color: #fff;
    }
} 

</style>