<template>
    <div>
        <slot></slot>
    </div>
</template>

<style scoped>
div {
    display: flex;
    flex-direction: column;
    border: 2px solid rgb(0, 0, 0);
    border-radius: 10px;
    box-shadow: 5px 5px 2px lightblue;
    padding: 5px;
    /* width: fit-content; */
}
</style>