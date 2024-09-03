document.addEventListener('DOMContentLoaded', () => {
    const key = document.getElementById('key');
    const blocks = document.querySelectorAll('.draggable');
    const target = document.getElementById('target');
    const grid = document.getElementById('grid');
    const resetButton = document.getElementById('reset-button');

    let activeBlock = null;
    let offsetX, offsetY;

    blocks.forEach(block => {
        block.addEventListener('mousedown', (e) => {
            activeBlock = block;
            offsetX = e.clientX - block.getBoundingClientRect().left;
            offsetY = e.clientY - block.getBoundingClientRect().top;
            document.addEventListener('mousemove', moveBlock);
            document.addEventListener('mouseup', () => {
                document.removeEventListener('mousemove', moveBlock);
                activeBlock = null;
            });
        });
    });

    function moveBlock(e) {
        if (activeBlock) {
            const x = e.clientX - offsetX - grid.getBoundingClientRect().left;
            const y = e.clientY - offsetY - grid.getBoundingClientRect().top;
            activeBlock.style.left = `${Math.max(0, Math.min(x, grid.clientWidth - activeBlock.clientWidth))}px`;
            activeBlock.style.top = `${Math.max(0, Math.min(y, grid.clientHeight - activeBlock.clientHeight))}px`;
        }
    }

    resetButton.addEventListener('click', () => {
        // Reset positions of the key and blocks
        key.style.left = '0px';
        key.style.top = '0px';
        blocks.forEach(block => {
            block.style.left = '';
            block.style.top = '';
        });
    });

    // Check if the key reaches the target
    function checkWin() {
        const keyRect = key.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        if (keyRect.left < targetRect.right &&
            keyRect.right > targetRect.left &&
            keyRect.top < targetRect.bottom &&
            keyRect.bottom > targetRect.top) {
            alert('You win!');
        }
    }

    document.addEventListener('mouseup', checkWin);
});
