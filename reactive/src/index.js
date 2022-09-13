import observe from "./module/observe";
import Watcher from "./module/Watcher";

let obj = {
    a: 1,
    b: {
        m: {
            n: 4
        }
    }
}

observe(obj)

let w1 = new Watcher(obj, 'a', (val, oldVal) => {
    console.log(`obj.a 从 ${oldVal}(oldVal) 变成了 ${val}(newVal)`)
})

obj.a = 2