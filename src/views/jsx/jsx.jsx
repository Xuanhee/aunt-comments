import { defineComponent, ref, watch } from 'vue'
import './jsx.css'
import { useRoute, useRouter } from 'vue-router'

function abc() {
  const router = useRouter()
  function push() {
    router.push({ path: '/' })
  }
  return push
}

// function clickPatent(emit) {
//   return () => emit('nice', 'nice')
// }

export default defineComponent({
  name: 'AAA',
  setup(props, { emit }) {
    const route = useRoute()
    const aq = ref('jsx')
    const push = abc()
    emit('good', 123)
    function clickP() {
      emit('nice', 'nice')
    }
    // const clickP = clickPatent(emit)
    const aaa = ref('111321')
    return () => {
      console.log(route, 3333)
      const jsx = aq.value
      watch(aaa, (newValue, oldValue) => {
        console.log(newValue, oldValue)
      })
      return (
        <a-card>
          <div class="jsx1">{jsx} wo</div>
          <button onClick={push}>aaa</button>
          <button onClick={clickP}>emit</button>
          {[1, 3, 4].map((item) => {
            return <div key={item}>{item}</div>
          })}
          <input type="text" v-model={aaa.value} style="height:50px;" />
        </a-card>
      )
    }
  },
})
