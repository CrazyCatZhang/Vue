<template>
    <div>
        <ul>
            <li v-for="message of messageList" :key="message.id">
                <router-link :to="{
                name: 'detail',
                params: {
                    id: message.id,
                    title: message.title
                }
                }">
                    {{ message.title }}
                </router-link>
            </li>
        </ul>
        <hr>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'News',
    data() {
        return {
            messageList: [
                {id: '001', title: '消息001'},
                {id: '002', title: '消息002'},
                {id: '003', title: '消息003'}
            ]
        }
    },
}
</script>