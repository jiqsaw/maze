describe('MAZE GAME UNIT TEST', () => {

  it('Enter incorrect values to see the alert', () => {

    const message = 'Dimension values should be greater than 0';
    spyOn(window, 'alert');

    generate(-2, 4);
    expect(window.alert).toHaveBeenCalledWith(message);

    generate(0, 5);
    expect(window.alert).toHaveBeenCalledWith(message);

    generate(2, 0);
    expect(window.alert).toHaveBeenCalledWith(message);

    generate(2, -4);
    expect(window.alert).toHaveBeenCalledWith(message);

  });

  it('Generate Maze by dimensions', (done) => {

    var HTMLElements = {};
    document.getElementById = jasmine.createSpy('HTML Element').and.callFake((id) => {
      if (!HTMLElements[id]) {
        var newElement = document.createElement('div');
        newElement.id = id;
        HTMLElements[id] = newElement;
      }
      return HTMLElements[id];
    });


    var xhr;
    var req;

    xhr = {
      open: (_type, _url) => {
        xhr.status = req[_url].status
        xhr.response = req[_url].response
        xhr.statusText = req[_url].statusText
      },
      send: () => {
        setTimeout(xhr.onload, 1)
      }
    }

    XMLHttpRequest = jasmine.createSpy(xhr).and.returnValue(xhr);

    const url = 'https://hubbado-maze-api.herokuapp.com/generate?width=6&height=4';
    const res = '{"cells":[[13,3,13,5,1,3],[11,8,5,5,2,14],[8,2,13,5,2,11],[14,14,13,5,4,6]]}';
    const result = '<table><tr><td class="left bottom top"></td><td class="right top"></td><td class="left bottom top"></td><td class="bottom top"></td><td class="top"></td><td class="right top"></td></tr><tr><td class="left right top"></td><td class="left"></td><td class="bottom top"></td><td class="bottom top"></td><td class="right"></td><td class="left bottom right"></td></tr><tr><td class="left"></td><td class="right"></td><td class="left bottom top"></td><td class="bottom top"></td><td class="right"></td><td class="left right top"></td></tr><tr><td class="left bottom right"></td><td class="left bottom right"></td><td class="left bottom top"></td><td class="bottom top"></td><td class="bottom"></td><td class="bottom right"></td></tr></table>';

    req = {
      ['' + url]: {
        response: res,
        status: 200
      }
    };

    generate(6, 4);
    const maze = document.getElementById('maze');
    var domCheckInterval = setInterval(() => {
      if (maze.innerHTML !== '') {

        expect(maze.innerHTML).toBe(result);

        clearInterval(domCheckInterval);
        done();
      }
    }, 100);

    expect(maze).not.toBeUndefined();

  });

})