import VueRouter from 'vue-router'

import About from "@/pages/About";
import Home from "@/pages/Home";
import News from "@/pages/News";
import Message from "@/pages/Message";
import Detail from "@/pages/Detail";

const router = new VueRouter({
    routes: [
        {
            path: '/about',
            component: About,
            meta: {title: '关于'}
        },
        {
            path: '/home',
            component: Home,
            meta: {title: '主页'},
            children: [
                {
                    path: 'news',
                    component: News,
                    meta: {title: '新闻', isAuth: true}
                },
                {
                    path: 'message',
                    component: Message,
                    meta: {title: '消息', isAuth: true},
                    children: [
                        {
                            name: 'detail',
                            path: 'detail/:id/:title',
                            component: Detail,
                            meta: {title: '详情', isAuth: true},
                            props({params}) {
                                return {
                                    id: params.id,
                                    title: params.title
                                }
                            }

                        }
                    ]
                }
            ]
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.meta.isAuth) {
        if (localStorage.getItem('name') === 'CatZhang') next()
        else alert('用户名不对...')
    } else {
        next()
    }
})

router.afterEach((to) => {
    document.title = to.meta.title
})

export default router