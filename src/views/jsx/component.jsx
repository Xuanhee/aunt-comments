import { defineComponent } from 'vue'
import Parent from './parent'

export default defineComponent({
  name: 'Com',
  setup() {
    // const slots = {
    //   default: () => <div>A</div>,
    //   foo: () => <span>B</span>,
    // }
    const flag = false
    return () => {
      return (
        <div>
          <Parent
            v-slots={{
              default: (d) => <div>{d}</div>,
              foo: () => <span>B</span>,
            }}
          ></Parent>
          <Parent
            v-slots={{
              default: () => <div>{333}</div>,
            }}
          ></Parent>
          {flag ? <span>123</span> : <div>666</div>}
        </div>
      )
    }
  },
})
