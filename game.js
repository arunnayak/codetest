(function Game() {
    // Elements
    const game = document.getElementById('game');
    const boxes = document.querySelectorAll('li');
    const resetGame = document.getElementById('reset-game');
    
    const context = { 'thor' : 'x', 'korg' : 'o' };
    
    let turns;
    let currentContext;
    let count = [];
    
    const init = () => {
        turns = 0;
        
        // Get current context
        currentContext = playersContext();
        
        // bind events
        for(let i = 0; i < boxes.length; i++) {
            boxes[i].addEventListener('click', clickHandler, false);
        }
        
        resetGame.addEventListener('click', resetGameHandler, false);
    };
    
    // player's turn tracking
    var playersContext = () => (turns % 2 == 0) ? context.thor : context.korg
    
    // Bind the dom element to the click callback
    var clickHandler = function() {
        this.removeEventListener('click', clickHandler);
        count.push(this);

        this.className = currentContext;
        this.innerHTML = currentContext;
        
        turns++;
        currentContext = playersContext();

        if(count.length === 9){
            document.getElementById('game-messages').innerHTML = `Game Over! click reset to restart again.` 
        }
    }
    
    // Stops user from clicking empty cells after game is over
    const clearEvents = () => {
        for(let i = 0; i < boxes.length; i++) {
            boxes[i].removeEventListener('click', clickHandler);
        }
    };

    // Reset game 
    var resetGameHandler = () => {
        clearEvents();
        init();
        
        //clear array length
        count.length = 0;

        //clear msgs
        document.getElementById('game-messages').innerHTML = '';

        // remove all classnames x,0
        for(let i = 0; i < boxes.length; i++) {
            boxes[i].className = '';
            boxes[i].innerHTML = '';
        }
        
    }
    
    game && init();
})();