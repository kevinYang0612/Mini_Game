const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 700;
let gameSpeed = 4;
// let gameFrame = 0;

// all images are 2400 px * 720 px
const backgroundLayer1 = new Image();
backgroundLayer1.src = "backgroundLayers/layer-1.png";
const backgroundLayer2 = new Image();
backgroundLayer2.src = "backgroundLayers/layer-2.png";
const backgroundLayer3 = new Image();
backgroundLayer3.src = "backgroundLayers/layer-3.png";
const backgroundLayer4 = new Image();
backgroundLayer4.src = "backgroundLayers/layer-4.png";
const backgroundLayer5 = new Image();
backgroundLayer5.src = "backgroundLayers/layer-5.png";
/*because redrawing will reset the background image, we are using 2 image cancel redraw effect*/

window.addEventListener('load', function ()
{
    // the speed that user changes is not the speed in class Layer argument (speedModifier) passing in
    // it is the gameSpeed, user can change that.
    const slider = document.getElementById('slider');
    slider.value = gameSpeed;       // this sets the initial speed and show at webpage, *line 5
    const showGameSpeed = document.getElementById('showGameSpeed'); // pull span tag out
    showGameSpeed.innerHTML = gameSpeed;  // this sends the gameSpeed to span tag and to html
    slider.addEventListener('change', function(e)
    {
        gameSpeed = e.target.value;
        showGameSpeed.innerHTML = e.target.value; // update html value of span tag
    });

    class Layer
    {
        constructor(image, speedModifier)
        {
            this.x = 0;     // x and y are position of src x and y, where is going to start drawing
            this.y = 0;
            this.width = 2400;  // image width and height
            this.height = 700;
            // this.x2 = this.width;   // getting the second image, set it after first image
            this.image = image;
            this.speedModifier = speedModifier;
            this.speed = gameSpeed * this.speedModifier;
        }
        update()
        {
            this.speed = gameSpeed * this.speedModifier;
            // making game speed is dynamic by reacting to the current value, the speed needs to be recalculated.
            if (this.x <= -this.width)  // x < -2400
            {
                this.x = 0;
                // reset the first image back to 0. This time, this is no need to fix the gap
            }


            this.x = Math.floor(this.x - this.speed);  // decrease, x making it moving right to left
            // this.x = gameFrame * this.speed % this.width;
            /*
                gameFrame is decreasing endlessly by going right to left
                % operation will cycle endless between 0 - 2400 because gameFrame is increasing forever
                this technique makes background layers jumps but not the previous technique
             */
        }
        draw()
        {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            // the second drawImage is filled in only 800 * 700 when first image runs out
            // and immediately reset the first image back to 0.
            ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
            // original x2 = 2400, now is 0 + 2400
            // just drawing the second same image, but taking the first 800 * 700 pixels
        }
    }
    const layer1 = new Layer(backgroundLayer1, 0.2);
    const layer2 = new Layer(backgroundLayer2, 0.4);
    const layer3 = new Layer(backgroundLayer3, 0.6);
    const layer4 = new Layer(backgroundLayer4, 0.8);
    const layer5 = new Layer(backgroundLayer5, 1);


    const gameObjects = [layer1, layer2, layer3, layer4, layer5];

    function animate()
    {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // when callback function recalled, clear previous paint, that is why we need clearRect
        gameObjects.forEach(object =>
        {
            object.update();
            object.draw();
        });
        // gameFrame--;  // this is making it going from right to left
        requestAnimationFrame(animate);
    }
    animate();
});


