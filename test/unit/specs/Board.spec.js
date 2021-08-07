import { mount } from '@vue/test-utils';
import Board from '@/components/Board.vue';

describe('Board.vue', () => {
  let wrapper, cells;

  beforeEach(() => {
    wrapper = mount(Board, {
      propsData: {
        size: 8
      }
    });
    cells = wrapper.findAll('td');
  });

  it('should create correct size board', () => {
    expect(wrapper.vm.$data.board.length).toEqual(8);
    expect(wrapper.vm.$data.board[0].length).toEqual(8);
  });

  it('should change turns when a cell is clicked', () => {
    expect(wrapper.vm.$data.turn).toEqual('black');
    cells.at(0).trigger('click');
    expect(wrapper.vm.$data.turn).toEqual('white');
  });

  it('should not do anything when clicking on an already-played cell', () => {
    expect(wrapper.vm.$data.turn).toEqual('black');
    cells.at(0).trigger('click');
    cells.at(0).trigger('click');
    expect(wrapper.vm.$data.turn).toEqual('white');
  });

  it('should return correct scores', () => {
    for (let i = 0; i < cells.length; i++) {
      cells.at(i).trigger('click');
    }
    expect(wrapper.vm.$data.scores.black).toEqual(56);
    expect(wrapper.vm.$data.scores.white).toEqual(8);
  });

  it('should end game when all spaces are full', () => {
    for (let i = 0; i < cells.length; i++) {
      cells.at(i).trigger('click');
    }
    expect(wrapper.vm.$data.totalCells).toEqual(64);
    expect(wrapper.vm.$data.gameOver).toEqual(true);
  });

  it('should capture a white circle to the left', () => {
    for (let cell in [0, 1, 2]) {
      cells.at(cell).trigger('click');
    }
    expect(wrapper.vm.$data.scores.black).toEqual(3);
    expect(wrapper.vm.$data.scores.white).toEqual(0);
  });

  it('should capture two white circles to the left', () => {
    for (let cell in [0, 1, 4, 2, 3]) {
      cells.at(cell).trigger('click');
    }
    expect(wrapper.vm.$data.scores.black).toEqual(5);
    expect(wrapper.vm.$data.scores.white).toEqual(0);
  });

  it('should capture a white circle to the right', () => {
    for (let cell in [2, 1, 0]) {
      cells.at(cell).trigger('click');
    }
    expect(wrapper.vm.$data.scores.black).toEqual(3);
    expect(wrapper.vm.$data.scores.white).toEqual(0);
  });

  it('should capture a white circle looking upward', () => {
    for (let cell in [0, 8, 16]) {
      cells.at(cell).trigger('click');
    }
    expect(wrapper.vm.$data.scores.black).toEqual(3);
    expect(wrapper.vm.$data.scores.white).toEqual(0);
  });

  it('should capture a white circle looking downward', () => {
    for (let cell in [16, 8, 0]) {
      cells.at(cell).trigger('click');
    }
    expect(wrapper.vm.$data.scores.black).toEqual(3);
    expect(wrapper.vm.$data.scores.white).toEqual(0);
  });
});
