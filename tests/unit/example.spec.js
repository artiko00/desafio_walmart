import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

describe('Prueba general de componente', () => {
  it('Prueba de descuento', () => {
    const producto = { brand: "Peluche", description: "", id: 181, image: "www.lider.cl/catalogo/images/whiteLineIcon.svg", price: 304093 }
    const wrapper = shallowMount(HelloWorld, {

      propsData: { productos: [producto], descuentos: true }
    })
    expect(wrapper.find("b-badge").text()).toBe("50%")
    console.log(wrapper.html())
  })

  it('Prueba de nombre', () => {
    const producto = { brand: "Peluche", description: "", id: 181, image: "www.lider.cl/catalogo/images/whiteLineIcon.svg", price: 304093 }
    const wrapper = shallowMount(HelloWorld, {

      propsData: { productos: [producto], descuentos: true }
    })
    expect(wrapper.find("h5").text()).toBe("Peluche")
    console.log(wrapper.html())
  })
})
