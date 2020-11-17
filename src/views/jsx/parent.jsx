import { defineComponent } from 'vue'
import JSX from './jsx'

export default defineComponent({
  name: 'Parent',
  setup(props, { slots }) {
    console.log(slots)
    function good(good) {
      console.log(good)
    }
    function nice(nice) {
      console.log(nice)
    }
    return () => {
      return (
        <a-card>
          我是parent
          <JSX onGood={good} onNice={nice}></JSX>
          <div>{slots.default && slots.default(123)}</div>
          <div>{slots.foo && slots.foo(444444444)}</div>
        </a-card>
      )
    }
  },
})
