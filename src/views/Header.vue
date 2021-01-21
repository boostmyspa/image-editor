<template>
    <header class="navbar navbar-top navbar-expand-lg">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">
                <img src="img/logo.png" alt="">
            </a>

            <div class="dropdown">
                <a>
                    Project 1.0
                </a>
                <div class="dropdown-menu">
                    <a class="dropdown-item" href="#">Project 1.2</a>
                    <a class="dropdown-item" href="#">Project 1.3</a>
                    <a class="dropdown-item" href="#">Project 1.4</a>
                    <a class="dropdown-item" href="#">Project 1.5</a>
                    <a class="dropdown-item" href="#">Project 2.0</a>
                </div>
            </div>

            <button class="btn btn-primary text-uppercase"><i class="icon-save"></i> Save design</button>
        </div>
    </header>
</template>

<script>
    export default {
        name: "Header",

        data: () => {
            return {

            }
        }
    }
</script>

<style scoped>

</style>