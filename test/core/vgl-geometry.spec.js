import Vue from 'vue/dist/vue';
import { BufferGeometry, BufferAttribute } from 'three';
import { VglGeometry, VglNamespace } from '../../src';

describe('VglGeometry', () => {
  let inject;
  beforeEach(() => {
    const { vglNamespace } = new Vue({ parent: new Vue(VglNamespace), inject: ['vglNamespace'] });
    inject = { vglNamespace: { default: vglNamespace } };
  });
  test('the inst property should be an instance of the BufferGeometry', () => {
    expect(new (Vue.extend(VglGeometry))({ inject }).inst).toBeInstanceOf(BufferGeometry);
  });
  test('the attributes of the instance should be specified by props', () => {
    const { inst } = new (Vue.extend(VglGeometry))({
      inject,
      propsData: {
        positionAttribute: '3, 1, 2, 2, -5, 6.3',
        colorAttribute: '0.8, 0.7, 0.9, 1, 0.1, 0.2',
        normalAttribute: '2, 0, 0, -3, 4, 3',
      },
    });
    const expected = new BufferGeometry();
    expected.addAttribute('position', new BufferAttribute(new Float32Array([3, 1, 2, 2, -5, 6.3]), 3));
    expected.addAttribute('color', new BufferAttribute(new Float32Array([0.8, 0.7, 0.9, 1, 0.1, 0.2]), 3));
    expected.addAttribute('normal', new BufferAttribute(new Float32Array([2, 0, 0, -3, 4, 3]), 3));
    expect(inst).toHaveProperty('attributes', expected.attributes);
  });
  describe('the instance sould not be reinstantiated after props change', () => {
    test('in case array lengths unchange', async () => {
      const vm = new (Vue.extend(VglGeometry))({
        inject,
        propsData: {
          positionAttribute: '1, 0.4, 3, 1.1, -5.3, 6.2',
          colorAttribute: '0.4, 0.5, 0.8, 0.9, 0.3, 0.1',
          normalAttribute: '2.3, 0.2, -0.3, -3.5, 4.2, 3.3',
        },
      });
      const { inst } = vm;
      vm.positionAttribute = '3, 1, 2, 2, -5, 6.3';
      vm.colorAttribute = '0.8, 0.7, 0.9, 1, 0.1, 0.2';
      vm.normalAttribute = '2, 0, 0, -3, 4, 3';
      await vm.$nextTick();
      expect(inst).toBe(vm.inst);
    });
    test('in case array lengths change', async () => {
      const vm = new (Vue.extend(VglGeometry))({
        inject,
        propsData: {
          positionAttribute: '1, 0.4, 3, 1.1, -5.3, 6.2, 1, 3.3, -2.1',
          colorAttribute: '0.4, 0.5, 0.8, 0.9, 0.3, 0.1, 0.8, 0.88, 0.78',
          normalAttribute: '2.3, 0.2, -0.3, -3.5, 4.2, 3.3, -1, -1.5, 3.1',
        },
      });
      const { inst } = vm;
      vm.positionAttribute = '3, 1, 2, 2, -5, 6.3';
      vm.colorAttribute = '0.8, 0.7, 0.9, 1, 0.1, 0.2';
      vm.normalAttribute = '2, 0, 0, -3, 4, 3';
      await vm.$nextTick();
      expect(inst).toBe(vm.inst);
    });
  });
  describe('the attributes of the instance should change after props change', () => {
    test('in case array lengths unchange', async () => {
      const vm = new (Vue.extend(VglGeometry))({
        inject,
        propsData: {
          positionAttribute: '1, 0.4, 3, 1.1, -5.3, 6.2',
          colorAttribute: '0.4, 0.5, 0.8, 0.9, 0.3, 0.1',
          normalAttribute: '2.3, 0.2, -0.3, -3.5, 4.2, 3.3',
        },
      });
      vm.positionAttribute = '3, 1, 2, 2, -5, 6.3';
      vm.colorAttribute = '0.8, 0.7, 0.9, 1, 0.1, 0.2';
      vm.normalAttribute = '2, 0, 0, -3, 4, 3';
      await vm.$nextTick();
      const expected = new BufferGeometry();
      const position = new BufferAttribute(new Float32Array([3, 1, 2, 2, -5, 6.3]), 3);
      position.needsUpdate = true;
      const color = new BufferAttribute(new Float32Array([0.8, 0.7, 0.9, 1, 0.1, 0.2]), 3);
      color.needsUpdate = true;
      const normal = new BufferAttribute(new Float32Array([2, 0, 0, -3, 4, 3]), 3);
      normal.needsUpdate = true;
      expected.addAttribute('position', position);
      expected.addAttribute('color', color);
      expected.addAttribute('normal', normal);
      expect(vm.inst).toHaveProperty('attributes', expected.attributes);
    });
    test('in case array lengths change', async () => {
      const vm = new (Vue.extend(VglGeometry))({
        inject,
        propsData: {
          positionAttribute: '1, 0.4, 3, 1.1, -5.3, 6.2, 1, 3.3, -2.1',
          colorAttribute: '0.4, 0.5, 0.8, 0.9, 0.3, 0.1, 0.8, 0.88, 0.78',
          normalAttribute: '2.3, 0.2, -0.3, -3.5, 4.2, 3.3, -1, -1.5, 3.1',
        },
      });
      vm.positionAttribute = '3, 1, 2, 2, -5, 6.3';
      vm.colorAttribute = '0.8, 0.7, 0.9, 1, 0.1, 0.2';
      vm.normalAttribute = '2, 0, 0, -3, 4, 3';
      await vm.$nextTick();
      const expected = new BufferGeometry();
      const position = new BufferAttribute(new Float32Array([3, 1, 2, 2, -5, 6.3]), 3);
      position.needsUpdate = true;
      const color = new BufferAttribute(new Float32Array([0.8, 0.7, 0.9, 1, 0.1, 0.2]), 3);
      color.needsUpdate = true;
      const normal = new BufferAttribute(new Float32Array([2, 0, 0, -3, 4, 3]), 3);
      normal.needsUpdate = true;
      expected.addAttribute('position', position);
      expected.addAttribute('color', color);
      expected.addAttribute('normal', normal);
      expect(vm.inst).toHaveProperty('attributes', expected.attributes);
    });
  });
});
