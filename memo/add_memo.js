const width = window.innerWidth;
const height = window.innerHeight;
const add_btn = document.getElementById("add");

const stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height
});

const layer = new Konva.Layer();
stage.add(layer);

let tempPx = 5;

add_btn.addEventListener('click', handleClickAdd);

function handleClickAdd(e){
    e.preventDefault();
    const textNode = new Konva.Text({
        text: 'Double click and write memo',
        x: 50 + tempPx,
        y: 50 + tempPx,
        fontSize: 20,
        shadowOpacity: 0.5
    });
    const rect = new Konva.Rect({
        x: 40 + tempPx,
        y: 40 + tempPx,
        stroke: '#555',
        strokeWidth: 1,
        fill: '#ddd',
        width: 300,
        height: textNode.height() + 50,
        shadowColor: 'black',
        shadowBlur: 10,
        shadowOffsetX: 10,
        shadowOffsetY: 10,
        shadowOpacity: 0.2,
    });
    const group = new Konva.Group({
        x: 20 + tempPx,
        y: 60 + tempPx,
        draggable: true
    })
    group.add(rect);
    group.add(textNode);

    tempPx+=5;
    
    layer.add(group);
    layer.draw();

    stage.on('click tap', function(e) {
        console.log(e.target);
        if (e.target === stage) {
          stage.find('Transformer').destroy();
          layer.draw();
          return;
        }
        if (e.target.hasName('group')) {
          return;
        }
        stage.find('Transformer').destroy();

        // create new transformer
        const tr = new Konva.Transformer();
        layer.add(tr);
        tr.attachTo(e.target);
        layer.draw();
      });

    textNode.on('dblclick', () => {
    const textPosition = rect.getAbsolutePosition();
    
    const stageBox = stage.container().getBoundingClientRect();
        
    const areaPosition = {
        x: stageBox.left + textPosition.x,
        y: stageBox.top + textPosition.y
    };
    
    const textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    
    textarea.value = textNode.text();
    textarea.style.position = 'absolute';
    textarea.style.top = areaPosition.y + 'px';
    textarea.style.left = areaPosition.x + 'px';
    textarea.addEventListener('keydown', function(e) {
        //ctrl
        if (e.keyCode === 17) {
          textNode.text(textarea.value);
          layer.draw();
          document.body.removeChild(textarea);
        }
    });

    group.addEventListener('dragend', function(e){
        const textPosition = rect.getAbsolutePosition();
    
        const stageBox = stage.container().getBoundingClientRect();
        
        const areaPosition = {
            x: stageBox.left + textPosition.x,
            y: stageBox.top + textPosition.y
        };
        textarea.style.top = areaPosition.y + 'px';
        textarea.style.left = areaPosition.x + 'px';

    })
    
    textarea.focus();
    });
}