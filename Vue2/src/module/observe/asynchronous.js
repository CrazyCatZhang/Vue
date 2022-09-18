let queue = []
let has = {}
let pending = false

function flushSchedulerQueue() {
    const flushQueue = queue.slice(0)
    queue = []
    has = {}
    pending = false
    flushQueue.forEach(queue => queue.run())
}

export function queueWatchers(watcher) {
    const id = watcher.id
    if (!has[id]) {
        queue.push(watcher)
        has[id] = true
        if (!pending) {
            nextTick(flushSchedulerQueue)
            pending = true
        }
    }
}

let callbacks = []
let waiting = false

function flushCallbacks() {
    const cbs = callbacks.slice(0)
    waiting = false
    callbacks = []
    cbs.forEach(cb => cb())
}

let timerFunc;
if (Promise) {
    timerFunc = () => {
        Promise.resolve().then(flushCallbacks)
    }
} else if (MutationObserver) {
    let observer = new MutationObserver(flushCallbacks)
    let textNode = document.createTextNode('1')
    observer.observe(textNode, {
        characterData: true
    });
    timerFunc = () => {
        textNode.textContent = '2';
    }
} else if (setImmediate) {
    timerFunc = () => {
        setImmediate(flushCallbacks)
    }
} else {
    timerFunc = () => {
        setTimeout(flushCallbacks)
    }
}

export function nextTick(callback) {
    callbacks.push(callback)
    if (!waiting) {
        timerFunc()
        waiting = true
    }
}