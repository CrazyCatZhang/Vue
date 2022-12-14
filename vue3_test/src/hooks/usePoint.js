import {reactive, onMounted, onBeforeUnmount} from "vue";

export default function usePoint() {
    //响应式数据
    let point = reactive({
        x: 0,
        y: 0
    });

    //方法
    const savePoint = event => {
        console.log(event.pageX, event.pageY);
        point.x = event.pageX;
        point.y = event.pageY;
    }

    //生命周期
    onMounted(() => {
        console.log('Point!!!!!')
        window.addEventListener('click', savePoint)
    });

    onBeforeUnmount(() => {
        //在卸载之前取消事件的监听
        window.removeEventListener('click', savePoint);
    })

    function test() {
        console.log('test!!!!!!!!!!')
    }

    return {point, test};
}