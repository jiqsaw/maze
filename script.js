function generate(width, height) {

    document.getElementById('loading').style.display = 'block';

    const url = 'https://hubbado-maze-api.herokuapp.com/generate?width=' + width + '&height=' + height;

    var xhr = new XMLHttpRequest();

    xhr.open("GET", url);
    xhr.send();


    xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            const data = JSON.parse(xhr.responseText);
            draw(data);
        } else {
            console.log('Error!')
        }

    };

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

            // td.innerHTML = cells[i][j];
            td.className = classNames.trimEnd();

            tr.appendChild(td)

        }

        table.appendChild(tr);
    }

    loading.style.display = 'none';
    maze.style.display = 'initial';

    maze.innerHTML = '';
    maze.appendChild(table);



}


