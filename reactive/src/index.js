import observe from "./module/observe";

let obj = {
    a: {
        b: {
            n: 3
        }
    }
}

observe(obj)
console.log(obj.a.b.n);
