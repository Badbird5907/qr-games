const ctx = (document.getElementById('fc') as HTMLCanvasElement).getContext('2d')!;

let bird = { x: 50, y: 200, v: 0 };
let pipes: { x: number, y: number }[] = [];
let score = 0;
let state = 0; // 0: start, 1: run, 2: over

const reset = () => {
    bird = { x: 50, y: 200, v: 0 };
    pipes = [];
    score = 0;
    state = 0;
};

document.addEventListener('keydown', e => {
    if (e.code === 'Space') {
        e.preventDefault();
        state === 2 ? reset() : (state = 1, bird.v = -3);
    }
});
document.getElementById('frs')!.addEventListener('click', reset);

const loop = () => {
    if (state === 1) { // running
        bird.v += 0.15; // grav
        bird.y += bird.v; // move

        if (!pipes.length || pipes[pipes.length - 1].x < 150)
            pipes.push({ x: 300, y: Math.random() * 200 + 100 }); // add new pipe

        pipes.forEach(p => {
            p.x--; // move pipe
            if (p.x === 48) score++; // score
            if (bird.x + 20 > p.x && bird.x < p.x + 50 && 
                (bird.y < p.y || bird.y + 20 > p.y + 100))
                state = 2; // game over
        });

        pipes = pipes.filter(p => p.x > -50); // remove off-screen pipes
        if (bird.y > 400 || bird.y < 0) state = 2; // game over
    }

    ctx.clearRect(0, 0, 300, 400); // clear canvas
    
    ctx.fillStyle = 'red';
    ctx.fillRect(bird.x, bird.y, 20, 20); // draw bird

    ctx.fillStyle = 'lime';
    pipes.forEach(p => {
        ctx.fillRect(p.x, 0, 50, p.y); // draw top pipe
        ctx.fillRect(p.x, p.y + 100, 50, 400 - p.y - 100);
    });

    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 30);

    if (state !== 1) { // game over or start
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillRect(0, 0, 300, 400);
        ctx.fillStyle = 'white';
        ctx.font = '30px Arial';
        ctx.fillText(state ? 'Game Over' : 'Space to Start', 60, 200);
    }

    requestAnimationFrame(loop);
};

reset();
loop();