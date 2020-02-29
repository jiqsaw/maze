
function generate(width, height) {

    if (width <= 0 || height <= 0) {
        alert('Dimension values should be greater than 0');
    } else {

        const data = {
            cells: []
        };

        document.getElementById('loading').style.display = 'block';
        document.getElementById('maze').innerHTML = '';
        
        const url = 'https://hubbado-maze-api.herokuapp.com/generate?width=' + width + '&height=' + height;

        get(url).then(response => {
            const object = JSON.parse(response);
            data.cells = object.cells;
            draw(data);
        })

    }

}

function get(url) {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();
      req.open('GET', url);
      req.onload = () => req.status === 200 ? resolve(req.response) : reject(Error(req.statusText));
      req.onerror = (e) => reject(Error(`Network Error: ${e}`));
      req.send();
    });
  }


function draw(data) {

    var A = [1, 2, 4, 8];

    var cells = data.cells;

    const loading = document.getElementById('loading');
    const maze = document.getElementById('maze');
    const table = document.createElement("table");

    for (let i = 0; i < cells.length; i++) {

        const tr = document.createElement('tr');

        for (let j = 0; j < cells[i].length; j++) {

            const td = document.createElement("td");
            var value = cells[i][j];

            var classNames = '';


            if (value & 8) {
                value -= 8;
                classNames += 'left ';
            }

            if (value & 4) {
                value -= 4;
                classNames += 'bottom ';
            }

            if (value & 2) {
                value -= 2;
                classNames += 'right ';
            }

            if (value & 1) {
                value -= 1;
                classNames += 'top ';
            }

            td.className = classNames.trimEnd();

            tr.appendChild(td)

        }

        table.appendChild(tr);
    }

    loading.style.display = 'none';

    maze.appendChild(table);

}


