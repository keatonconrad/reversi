import { mount } from '@vue/test-utils';
import App from '@/App.vue';

describe('App.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(App);
    jest.spyOn(window, 'alert').mockReturnValue();
  });

  it('allows setting board dimensions', () => {
    wrapper.find('input').setValue(8);
    wrapper.find('button').trigger('click');
    expect(window.alert).not.toHaveBeenCalled();
  });

  it('rejects board size under 3', () => {
    wrapper.find('input').setValue(2);
    wrapper.find('button').trigger('click');
    expect(window.alert).toHaveBeenCalled();
  });
});
